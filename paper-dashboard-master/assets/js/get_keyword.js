// Initialize the echarts instance based on the prepared dom
var myChart = echarts.init(document.getElementById('keywords'),null);
// myChart.resize({
// width: 800,
// height: 400
// });
    
// Specify the configuration items and data for the chart
var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        // orient: 'horizontal',
        left: 'leftt',
        data: [
        'AI',
        'NLP',
        '코테',
        '취업',
        'Recsys'
        ]
    },
    series: [
        {
        name: 'Access Source',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
            { value: 335, name: 'AI' },
            { value: 310, name: 'NLP' },
            { value: 234, name: '코테' },
            { value: 135, name: '취업' },
            { value: 1548, name: 'Recsys' }
        ],
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ]
    };

    let currentIndex = -1;

    setInterval(function() {
    var dataLen = option.series[0].data.length;
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    currentIndex = (currentIndex + 1) % dataLen;
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    }, 1000);

// Display the chart using the configuration items and data just specified.
myChart.setOption(option);
myChart.on('click', function (params){
    if (params.componentType === 'markPoint'){
    window.open('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=' +  encodeURIComponent(params.name))}
    else if (params.componentType === 'series'){

    }
})
