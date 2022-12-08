const common = {
    "привет": [
        "привет",
        "здарово"
    ],
    "здравствуете": [
        "здравствуете",
        "добрые день"
    ],
    "кто ты": [
        "я чат-бот"
    ],
    "какие дакументы нужны для практики": [
        "Договор и заявления на прохождение практики с компании в которое вы будете проходит практику"
    ],
    "что ты можешь делать": [
        "я могу говорить с тобой, пока мой словарный запас не иссякнет"
    ],
    "рад тебя видеть": [
        "я тоже",
        "и мне тоже"
    ],
    "кто создал тебя": [
        "Мой создатель Самариддин Сайфиддинов",
        "его зовут Самариддин",
        "Мой разработчик Самариддин"
    ],
    "пока": [
        "пока пока",
        "Увидимся",
        "хорошего дня",
        "хорошо"
    ],
    "хорошо": [
        "хорошего дня",
        "хорошо"
    ],
};

const command = {
    "найди": {
        "информацию": {
            "проекте": {
                "studybook": ["hello world"],
                "student-helper": ["Information about student helper project"],
                "native-cli-on-node": ["Information about 'native cli on node' project"]
            },
            "free-time": ["on weekend"]
        },
        "проекты": ["studybook", "student helper", "native cli on node"],
        "файлы": ["text.txt", "pdf.pdf"]
    },

    "создай": {
        "проект": {
            "react": ["react project was created"],
            "python": ["python project was created"]
        }
    }
};

class Chatbot {
    constructor(common, command) {
        this.common = common;
        this.command = command;
    };

    tokenizer(text) {
        let tokeniz = text.replace(/[&\/\\#`,+()$~%.'":*!?<>{}]/g, '').split(" ");
        let corpus = [];

        for (let i = 0; i < tokeniz.length; i++) {
            if (tokeniz[i] == "") continue;
            else corpus[i] = tokeniz[i].toLowerCase();
        }

        return corpus;
    };

    randArr(arr) {
        var rand = Math.random() * arr.length | 0;
        var rValue = arr[rand];
        return rValue;
    }

    hammingDistance(str1 = '', str2 = '') {
        if (str1.length !== str2.length) {
            return;
        }
        let dist = 0;
        for (let i = 0; i < str1.length; i += 1) {
            if (str1[i] !== str2[i]) {
                dist += 1;
            }
        }

        return dist;
    };

    createTree(obj = this.command) {
        if (typeof Object.keys(obj) === 'number') return 0;

        let ul = [];

        for (let key in obj) {
            if (Object.keys(key).toString() == '0') return 0;
            let li = [];
            li.push(key);

            let childrenUl = this.createTree(obj[key]);

            if (childrenUl) {
                li.push(childrenUl);
            }

            ul.push(li);
        }

        return ul;
    };

    searchAnswer(query, obj = this.common) {
        query = query.toLowerCase();
        for (const key in obj) {
            if (2 >= this.hammingDistance(query, key)) {
                return this.randArr(obj[key]);
            }
        }

        return null;
    };

    searchNode(tree, obj = this.command) {
        let backed;

        const foo = (a, b) => { return this.hammingDistance(a, b) };

        function getProp(o) {
            for (let i = 0; i < tree.length; i++) {
                for (let prop in o) {
                    if (typeof(o[prop]) === 'object' && (2 >= foo(tree[i], prop))) {
                        tree = tree.slice(i);

                        if (!Array.isArray(o[prop])) {
                            backed = getProp(o[prop]);
                        } else {
                            o[prop] = o[prop].join(', ');

                            return prop + ': ' + o[prop];
                        }

                        return backed;
                    } else {
                        continue
                    }
                }
            }
        };

        return getProp(obj);
    };

    createNode() {
        this.common;
        this.command;



    };

    editNode() {

    };

    getAnswer(talk) {
        const tree = this.tokenizer(talk);
        const res = [];
        let answer;
        let n = 0;

        for (let i = 0; i < tree.length; i++) {
            answer = this.searchAnswer(tree[i]);
            if (answer) {
                res[n] = answer;
                n++;
            }

            if (i == tree.length - 1) {
                talk = talk.replace(/[&\/\\#`+()$~%'":*!?<>{}]/g, '');
                console.log(talk)
                answer = this.searchAnswer(talk);
                if (answer && n > 0) {
                    res[n] = answer;
                    n++;
                    break;
                }

                let temp = n;
                talk.split(', ').forEach(e => {
                    answer = this.searchAnswer(e);

                    if (answer && temp == 0) {
                        res[n] = answer;
                        n++;
                    }
                    temp--;
                });
            }
        }

        answer = this.searchNode(tree);
        if (answer) {
            res[n] = answer;
        }

        if (res == 0) {
            console.log('Похоже я не смогу ответить вам, вы можете дополнить мой словарь');
        }

        return res.join(', ');
    };
}


(function() {

    $('#live-chat header').on('click', function() {

        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');

    });

    $('.chat-close').on('click', function(e) {

        e.preventDefault();
        $('#live-chat').fadeOut(300);

    });

})();

document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === 'Control') {
        // not alert when only Control key is pressed.
        return;
    }

    if (event.ctrlKey && keyName == 'b') {
        event.preventDefault();
        $('#live-chat').fadeIn(300);
    }
}, false);

const answerElement = document.querySelector('.chat-history');
const message = document.querySelector('#chating');
const bot = new Chatbot(common, command);
const randTime = [1000, 1500, 2000, 2500];

function chating() {
    let question = message.querySelector('#text').value;

    function scrollToBottom(div) {
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }
    let timer = bot.randArr(randTime)
    printQuestion(question);
    scrollToBottom(answerElement);
    message.querySelector('#text').value = '';

    setTimeout(() => {
        printAnswer(question);
    }, timer);

    setTimeout(() => {
        scrollToBottom(answerElement);
    }, timer + 2);
}

//Функция печати ответа в элемент answer на html документе
function printQuestion(question) {
    var now = new Date();

    answerElement.insertAdjacentHTML("beforeend",
        `<hr><div class="chat-message clearfix2">
            <img src="/static/studentapp/assets/images/17.jpg" alt="" width="32" height="32">
            <div class="chat-message-content clearfix2">
                <span class="chat-time">${now.getHours() + ':'+now.getMinutes()}</span>
                <h5>Samariddin</h5>

                <p>${question}</p>
            </div>
         </div><hr>`);
}

function printAnswer(answer) {
    var now = new Date();

    answer = bot.getAnswer(answer);

    if (answer == 0) {
            answer = 'Похоже я не смогу ответить вам, вы можете дополнить мой словарь';
        }

    answerElement.insertAdjacentHTML("beforeend",
        `<hr><div class="chat-message clearfix2">
            <img src="/static/studentapp/assets/images/fs.png" alt="" width="32" height="32">
            <div class="chat-message-content clearfix2">
                <span class="chat-time">${now.getHours() + ':'+now.getMinutes()}</span>
                <h5>Bot</h5>
                <p>${answer}</p>
            </div>
         </div><hr>`);
}

message.addEventListener('keyup', (event) => {
    event.preventDefault();
    const keyName = event.key;

    if (keyName == 'Enter') {
        event.preventDefault();
        chating();
    }
});
