import { Inngest } from "inngest";
import userModel from "../models/user.model.js";
import storyModel from "../models/story.model.js";
import connectionModel from "../models/connection.model.js";
import messageModel from "../models/message.model.js";
import sendEmail from "../utils/sendEmail.js";
import {getReminderContent, getNotificationContent} from "../utils/reminderContent.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "postly", eventKey: process.env.INNGEST_EVENT_KEY });

// Inngest function to save user of clerk data to a database
const syncUserCreation = inngest.createFunction(
    {id: "sync-user-from-clerk"},
    {event: "clerk/user.created"},
    async ({event, step})=> {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const email = email_addresses[0].email_address
        const full_name = last_name ? first_name + ' ' + last_name : first_name
        let username = email.split("@")[0]

        await step.run("check-username", async()=> {
            const user = await userModel.findOne({username})
            if(user) username = username + Math.floor(Math.random() * 10000)
        })

        const userData = {
            _id:id,
            email,
            username,
            full_name,
            profile_picture: image_url
        }
        await step.run("create-user", async()=> {
            await userModel.create(userData)
        })
    }
)

// Inngest function to update user of clerk data to a database
const syncUserUpdation = inngest.createFunction(
    {id: "update-user-from-clerk"},
    {event: "clerk/user.updated"},
    async ({event, step})=> {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const email = email_addresses[0].email_address
        const full_name = last_name ? first_name + ' ' + last_name : first_name
        const updatedUserData = {
            email,
            full_name,
            profile_picture: image_url
        }
        await step.run("update-user", async()=> {
            await userModel.findByIdAndUpdate(id, updatedUserData)
        })
    }
)

// Inngest function to delete user of clerk data from a database
const syncUserDeletion = inngest.createFunction(
    {id: "delete-user-from-clerk"},
    {event: "clerk/user.deleted"},
    async ({event, step})=> {
        await step.run("delete-user", async()=> {
            await userModel.findByIdAndDelete(event.data.id)
        })
    }
)

// Inngest function to delete story from a database
const syncStoryDeletion = inngest.createFunction(
    {id: "delete-story-from-db"},
    {event: "app/story.deleted"},
    async ({event, step})=> {
        const {storyId} = event.data
        const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000)
        await step.sleepUntil("wait-for-24-hours", in24Hours)
        await step.run("delete-story", async()=> {
            await storyModel.findByIdAndDelete(storyId)
        })
    }
)

// Inngest function to send reminder of request connection to user email
const syncNewConnectionRequestReminder = inngest.createFunction(
    {id: "sync-connection-request-reminder"},
    {event: "app/connection.requested"},
    async ({event, step})=> {
        const {connectionId} = event.data
        await step.run("send-connection-request", async()=> { 
            const newConnection = await connectionModel.findById(connectionId).populate("to_user from_user")
            const {subject, body} = getReminderContent(newConnection)
            await sendEmail({
                to: newConnection.to_user.email,
                subject,
                body
            })
        })

        const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000)
        await step.sleepUntil("wait-for-24-hours", in24Hours)
        await step.run("send-reminder-after-24-hours", async()=> {
            const newConnection = await connectionModel.findById(connectionId).populate("to_user from_user")
            if(!newConnection || newConnection.status == "accepted") return
            const {subject, body} = getReminderContent(newConnection)

            await sendEmail({to: newConnection.to_user.email, subject, body})
        })
    }
)

// Inngest function to send notification of unseen messages to user email
const syncUnseenMessages = inngest.createFunction(
    {id: "sync-unseen-messages-notfication"},
    {cron: "TZ=America/New_York 0 9 * * *"},
    async ({step})=> {
        const messages = await step.run("get-unseen-messages", async()=> {
            return await messageModel.find({seen:false}).populate("to_user")
        })
        const unseenCount = {}
        messages.map(message => {
            const to_user = message.to_user?._id
            if(!to_user) return
            unseenCount[to_user] = (unseenCount[to_user] || 0) + 1
        })
        await step.run("send-unseen-messages-notfication", async()=> {
            for(const userId in unseenCount) {
                const user = await userModel.findById(userId)
                if(!user) continue
                const {subject, body} = getNotificationContent(user, unseenCount, userId)

                await sendEmail({to: user.email, subject, body})
            }
        })
    }
)

export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    syncStoryDeletion,
    syncNewConnectionRequestReminder,
    syncUnseenMessages
];