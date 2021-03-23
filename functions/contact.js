require("dotenv").config();
const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  MAILGUN_URL,
  FROM_EMAIL_ADDRESS,
  CONTACT_TO_EMAIL_ADDRESS,
} = process.env;
const mailgun = require("mailgun-js")({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
  url: MAILGUN_URL,
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
      headers: { Allow: "POST" },
    };
  }

  const { comment, email, area, firstName, lastName } = JSON.parse(event.body);
  if (!email || !firstName || !lastName || !area) {
    return {
      statusCode: 422,
      body: "Name, email, area of interest are required.",
    };
  }

  const mailgunData = {
    from: FROM_EMAIL_ADDRESS,
    to: CONTACT_TO_EMAIL_ADDRESS,
    "h:Reply-To": email,
    subject: `FROM: ${firstName} ${lastName} - ${email}`, // Subject line
    html: `<h3>Area of Interest: ${area}</h3><p>${comment}<p/>`,
  };

  return mailgun
    .messages()
    .send(mailgunData)
    .then(() => ({
      statusCode: 200,
      body: "Your message was sent successfully! We'll be in touch.",
    }))
    .catch((error) => ({
      statusCode: 422,
      body: `Error: $`,
    }));
};
