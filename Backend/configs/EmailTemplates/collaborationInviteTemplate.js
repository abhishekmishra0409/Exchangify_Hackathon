const collaborationInviteTemplate = (data) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h1 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                    New Collaboration Invitation
                </h1>

                <div style="margin: 20px 0;">
                    <h2 style="color: #34495e; font-size: 18px;">From:</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${data.sender.name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${data.sender.email}</p>
                    </div>
                </div>

                <div style="margin: 20px 0;">
                    <h2 style="color: #34495e; font-size: 18px;">Team Details:</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
                        <p style="margin: 5px 0;"><strong>Team Name:</strong> ${data.team.name}</p>
                        <p style="margin: 5px 0;"><strong>Members:</strong> ${data.team.memberCount} members</p>
                    </div>
                </div>

                <div style="margin: 20px 0;">
                    <h2 style="color: #34495e; font-size: 18px;">Collaboration Details:</h2>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
                        <p style="margin: 5px 0;"><strong>Project:</strong> ${data.collab.title}</p>
                        <div style="margin: 10px 0;">
                            <strong>Message:</strong>
                            <p style="margin: 5px 0; white-space: pre-line;">${data.message}</p>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.responseUrl}" 
                       style="background-color: #3498db; color: white; padding: 12px 25px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Respond to Invitation
                    </a>
                </div>

                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #7f8c8d; font-size: 12px;">
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </div>
    `;
};

module.exports = {
    // ... existing templates ...
    collaborationInviteTemplate
};