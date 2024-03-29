exports.courseEnrollmentEmail = (courseName, name) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Course Registration Confirmation</title>
        <style>
            body{
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            .logo{
                max-width: 200px;
                margin-bottom: 20px;
            }

            .message{
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .cta{
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
            .body{
                font-size: 16px;
                margin-bottom: 20px;
            }

            .support{
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            .highlight{
                font-weight: bold;
            }
            button{
                background-color: #FFD60A;
                border: 2px solid black;
                padding: 10px 8px;
                font-size: large;
                border-radius: 10px;
                cursor: pointer;
            }
            

        </style>
    </head>
    <body>
        <div class="container">
            <img class="logo" src="https://res.cloudinary.com/dnkp2gm1d/image/upload/v1711551777/StudyNotion/Studynotion_Logo_wanqnk.png" alt="StudyNotion Logo" >
            <div class="message">Course Registration Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>
                    You have successfully registered for the course <span class="highlight">${courseName}</span>. We 
                    are excited to have you as a participant!
                </p>

                
                <p>
                    Please log in to your learning dashboard to access the course materials and start your learning journey. 
                </p>
                <a  href="#">
                <button >
                    Reset Password
                </button>
            </a>
            </div>
            <div class="support">
                If you have any questions or need futher assistance, please feel free to reach us at
                <a href="mailto:cannon.khan786@gmail.com">info@studynotion.com</a>. We are here to help!
            </div>
        </div>
    </body>
    </html>`
}