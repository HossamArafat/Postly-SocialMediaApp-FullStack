
const getReminderContent = (connection) => {
    const subject = "New connection Request"
    const body = `
        <div style="font-family:Arial, sans-serif; padding:20px;">
            <h2>Hi ${connection.to_user.full_name}</h2>
            <p>You have a new connection request from ${connection.from_user.full_name} - @${connection.from_user.username} </p>
            <p>Click <a href="${process.env.FRONTEND_URL}/connections" style="color:#10b981;">here</a> to accept or reject the request</p><br/>
            <p>Thanks, <br/>Postly - Stay Connected</p>
        </div>`

    return {subject, body}
}

const getNotificationContent = (user, count, id) => {
    const subject = `You have ${count[id]} unseen messages`
    const body = `
        <div style="font-family:Arial, sans-serif; padding:20px;">
            <h2>Hi ${user.full_name}</h2>
            <p>You have ${count[id]} unseen messages</p>
            <p>Click <a href="${process.env.FRONTEND_URL}/messages" style="color:#10b981;">here</a> to view them</p><br/>
            <p>Thanks, <br/>Postly - Stay Connected</p>
        </div>`

    return {subject, body}
}

export { getReminderContent, getNotificationContent}