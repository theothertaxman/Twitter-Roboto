const twit = require("twit");
const my_user_name = require("config").userName;
const timeout = 1000 * 60 * 5;

const AutoDM = () => {
    const stream = twit.stream("user");
    console.log("Start sending Auto Direct Message 🤠🧙‍");
    stream.on("follow", SendMessage);
};

const SendMessage = user => {
    console.log("Hey dude, you got a new follower. Congrats!")
    const { screen_name, name} = user.source;

    const obj = {
        screen_name,
        text: GenerateMessage(name)
    };
    //Check if you follow this person
    if (screen_name != my_user_name){
        setTimeout(() => {
            twit.post("direct_messages/new", obj)
                .catch(err => {
                    console.error("error", err.stack)
                })
                .then(result => {
                    console.log(`Message sent successfully to ${screen_name}`);
                });
        }, timeout);
    }
};

const GenerateMessage = name => {
    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    const current_date = new Date();
    const day_name = days[current_date.getDay()];
    return `Hi ${name}, thanks for following me. I should add something creative here, but for now we'll leave the generic follow message. \n Happy ${day_name} :D`;
};

