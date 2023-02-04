// Initialize the echarts instance based on the prepared dom
async function postData(url='', data={}){
    const response = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    }
        );
        // console.log(response)
        return response.json();
            };

// setting for variable for request
// 요청 변수 설정 : pydantic에서 DtsInput에 해당하는 부분
const start_date = document.getElementById('start_date').value;
const chat_room = document.getElementById('selchat').value;
const time_period = document.getElementById('time_period').value;
const b = document.getElementById('interest-Keyword').children;
const penalty_ls = [];
for (let i=0;i <= 16;i++){
    if (b[`checkbox${i}`].checked){
        penalty_ls.push(b[`checkbox${i}`].value)
    }
};

const request ={
    'chat_room' : chat_room,
    'start_date' : start_date,
    'time_period' : time_period,
    'penalty' : penalty_ls
};

const url = 'http://127.0.0.1:8000';

const form = document.getElementById("my_form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const data = await postData(url+'/dts' , request);
    console.log(data)
    // var request = { answer : val.value}
    // const data = await postData('http://127.0.0.1:8000/answer', request);
    // const date = document.createTextNode(`결과 ${data.answer}`);
    // formOutput.appendChild(date)
});

var myChart = echarts.init(document.getElementById('charts'),null,{width : 800 , height : 400});

var option = {
    title: {
        text: 'Rainfall',
        subtext: 'Fake Data'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Rainfall']
    },
    toolbox: {
        show: true,
        feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
        }
    },
    calculable: true,
    xAxis: [
        {
        type: 'time',
        // type: 'category',
        // prettier-ignore
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    ],
    yAxis: [
        {
        type: 'value'
        }
    ],
    series: [
        {
        name: 'Rainfall',
        type: 'line',
        data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ],
        markPoint: {
            data: [
            // 데이터의 개수만큼
            // 포문 짜면되지않을까? -> 리스트 컴프리핸션 몰라 ㅋ
            { name: '0', value: '하윙', xAxis: 0, yAxis: 2 },
            { name: '1', value: '하윙', xAxis: 1, yAxis: 4.9 },
            { name: '2', value: '하윙', xAxis: 2, yAxis: 7 },
            { name: '3', value: '하윙', xAxis: 3, yAxis: 23.2 },
            { name: '4', value: '하윙', xAxis: 4, yAxis: 25.6 },
            { name: '5', value: '하윙', xAxis: 5, yAxis: 76.7 },
            { name: '6', value: '하윙', xAxis: 6, yAxis: 134.6 },
            { name: '7', value: '하윙', xAxis: 7, yAxis: 162.2 },
            { name: '8', value: '하윙', xAxis: 8, yAxis: 32.6 },
            { name: '9', value: '하윙', xAxis: 9, yAxis: 20 },
            { name: '10', value: '하윙', xAxis: 10, yAxis: 6.4 },
            { name: '11', value: '하윙', xAxis: 11, yAxis: 3.3 }
            ]
        },
        markLine: {
            data: [{ yAxis: 70, name: 'threshold' }]
        }
        }
    ]
};

// Display the chart using the configuration items and data just specified.
myChart.setOption(option);
myChart.on('click', function (params){
    if (params.componentType === 'markPoint'){
    window.open('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=' +  encodeURIComponent(params.name))}
    else if (params.componentType === 'series'){

    }
})
