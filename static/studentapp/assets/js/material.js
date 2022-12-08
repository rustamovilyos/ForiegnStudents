document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
    modeSwitch.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        modeSwitch.classList.toggle('active');
    });

    var listView = document.querySelector('.list-view');
    var gridView = document.querySelector('.grid-view');
    var projectsList = document.querySelector('.project-boxes');

    listView.addEventListener('click', function () {
        gridView.classList.remove('active');
        listView.classList.add('active');
        projectsList.classList.remove('jsGridView');
        projectsList.classList.add('jsListView');
    });

    gridView.addEventListener('click', function () {
        gridView.classList.add('active');
        listView.classList.remove('active');
        projectsList.classList.remove('jsListView');
        projectsList.classList.add('jsGridView');
    });

    document.querySelector('.messages-btn').addEventListener('click', function () {
        document.querySelector('.messages-section').classList.add('show');
    });

    document.querySelector('.messages-close').addEventListener('click', function () {
        document.querySelector('.messages-section').classList.remove('show');
    });
});


async function getinfo() {
    let date = new Date()
    let day = [0, 0, 1, 2, 3, 4, 5][date.getDay()]
    let info = await fetch('https://iis.bsuir.by/api/v1/schedule?studentGroup=921732')
    let readJson = await info.json()
    console.log(readJson.studentGroupDto)
    let group = [readJson.studentGroupDto[0]]
    let weekDay = [readJson.schedules[day].weekDay]
    let weekNumber = [readJson.schedules[day].schedule[day].weekNumber[0]]
    let lessonTime = [readJson.schedules[day].schedule[day].lessonTime]
    let subject = [readJson.schedules[day].schedule[day].subject]
    let auditory = [readJson.schedules[day].schedule[day].auditory[0]]
    let lesson_type = [readJson.schedules[day].schedule[day].lessonType]
    let fullInfo = [readJson.schedules[day]]
    let teachPhoto = [readJson.schedules[day].schedule[day].employee[0].photoLink]
    let teachFName = [readJson.schedules[day].schedule[day].employee[0].firstName]
    let teachLName = [readJson.schedules[day].schedule[day].employee[0].lastName[0]]
    let teachMName = [readJson.schedules[day].schedule[day].employee[0].middleName[0]]

    new Vue({
        delimiters: ['{*', '*}'],
        el: '#app',
        data: {
            group: [group[0]],
            weekDay: [weekDay[0]],
            weekNumber: [weekNumber[0]],
            subject: [subject[0]],
            auditory: [auditory[0]],
            lessonTime: [lessonTime[0]],
            lesson_type: [lesson_type[0]],
            fullInfo: [fullInfo],
            teachPhoto: [teachPhoto[0]],
            teachFName: [teachFName[0]],
            teachLName: [teachLName[0]],
            teachMName: [teachMName[0]],
            }
    })
}

getinfo()
