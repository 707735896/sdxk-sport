<template>
    <div class="main">
        <div class="top">
            <div>
                <div class="btn-left">实时</div>
                <div class="tips">
                    计划到场人数
                    <span style="color: #FF7B10;font-size: 48px;">{{plan_num}}</span>
                    人，已到场人数
                    <span style="color: #FF7B10;font-size: 48px;">{{attendance}}</span>人
                </div>
            </div>

            <div class="time"><img src="../assets/common/time.png"/><span id="DateTime">系统时间加载中...</span></div>
        </div>

        <div class="line"></div>
        <div class="satis-canvas" style="height: calc(100% - 93px);">
            <div style="height: 100%;" id="main" ref="charts"></div>
        </div>
    </div>
</template>

<script>
    import urls from '../service/Urls';

    // 引入 ECharts 主模块
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // // 引入提示框和标题组件
    require('echarts/lib/component/legend');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legendScroll');
    export default {
        name: 'quenu',
        data() {
            return {
                plan_num: '',
                attendance: '',
                charts: '',
                option: {},
                yData: [],
                pName: [],
                wData: [],
                timer: null
            };
        },
        methods: {
            fnDate() {
                let oDiv = document.getElementById('DateTime');
                let date = new Date();
                let year = date.getFullYear(); //当前年份
                let month = date.getMonth(); //当前月份
                let data = date.getDate(); //天
                let hours = date.getHours(); //小时
                let minute = date.getMinutes(); //分
                let second = date.getSeconds(); //秒
                let time = year + '年' + this.fnW((month + 1)) + '月' + this.fnW(data) + '日' + this.fnW(hours) + ':' + this.fnW(minute) + ':' + this.fnW(second);
                oDiv.innerHTML = time;
            },
            fnW(str) {
                return str > 9 ? str : '0' + str;
            },
            getReload() {
                let id = this.$route.params.id;
                let code = this.$route.params.code;

                if (!id || !code) {
                    this.$alert({
                        text: '请先选择体检计划',
                        onOk: function () {
                            this.$router.push('/medicalExamination/examinationAction/condition');
                        }
                    });
                    return false;
                }

                this.$ajax({
                    url: urls.big_screen,
                    data: {
                        plan_id: id
                    }
                }).then(data => {
                    if (data.code === 200) {

                    }
                });

                this.$ajax({
                    url: urls.getQuene,
                    data: {
                        plan_code: code
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.attendance = data.attendance;
                        this.plan_num = data.plan_num;
                        // this.getQuene();

                        let json = data.data;

                        let series = [];
                        let xAxis = Object.keys(json);
                        series = xAxis.map(item => json[item]);

                        this.option = {
                            title: {
                                text: '人数',
                                textStyle: {
                                    color: '#FF7B10',
                                    fontSize: 33
                                },
                                padding: [0, 0, 100, 120]
                            },
                            legend: {
                                // data: ['已检人数', '未检人数'],
                                left: '13%',
                                textStyle: { //----图例内容样式
                                    color: '#FF7B10', //---所有图例的字体颜色
                                    fontSize: 24
                                }
                            },
                            //x轴显示
                            xAxis: {
                                data: xAxis,
                                splitLine: {
                                    show: false,
                                    interval: 0
                                },
                                nameTextStyle: { //---坐标轴名称样式
                                    color: '#fff',
                                    padding: [5, 0, 0, -5], //---坐标轴名称相对位置
                                },
                                axisLine: { //---坐标轴 轴线
                                    show: true, //---是否显示
                                    lineStyle: {
                                        color: '#C7D2CF',
                                        width: 1,
                                        type: 'solid',
                                    },
                                },
                                axisLabel: {
                                    fontSize: 22
                                }
                            },
                            //y轴显示
                            yAxis: {
                                // data: this.pName,
                                splitLine: {
                                    show: false,
                                    interval: 0
                                },
                                axisLine: { //---坐标轴 轴线
                                    show: true, //---是否显示
                                    lineStyle: {
                                        color: '#C7D2CF',
                                        width: 1,
                                        type: 'dashed',
                                    },
                                },
                                axisLabel: {
                                    fontSize: 22
                                }
                            },
                            series: [
                                {
                                    name: '已检人数',
                                    type: 'bar',
                                    data: series,
                                    // barWidth: 38,
                                    stack: '人数',
                                    //显示颜色
                                    itemStyle: {
                                        normal: {
                                            color: '#4A4C5F'
                                        }
                                    },
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'inside',
                                            // fontSize: 22
                                        }
                                    },
                                }
                            ]
                        };
                        if (!this.charts) {
                            this.charts = echarts.init(document.getElementById('main'));
                        }
                        this.charts.setOption(this.option);

                        // let {keys, values} = Object;
                        // let yData = [];
                        // let pName = [];
                        // let wData = [];
                        // for (let key of keys(data.data)) {
                        //     pName.push(key);
                        // }
                        // for (let value of values(data.data)) {
                        //     wData.push(value);
                        //     yData.push(data.plan_num - value);
                        // }
                        // this.yData = yData;
                        // this.wData = wData;
                        // this.pName = pName;
                        // this.getQuene();
                    }
                });
            },
            getQuene() {
                this.option = {
                    title: {
                        text: '人数',
                        textStyle: {
                            color: '#FF7B10',
                            fontSize: 33
                        },
                        padding: [0, 0, 100, 120]
                    },
                    legend: {
                        data: ['已检人数', '未检人数'],
                        left: '13%',
                        textStyle: { //----图例内容样式
                            color: '#FF7B10', //---所有图例的字体颜色
                            fontSize: 24
                        }
                    },
                    //x轴显示
                    xAxis: {
                        splitLine: {
                            show: false
                        },
                        nameTextStyle: { //---坐标轴名称样式
                            color: '#fff',
                            padding: [5, 0, 0, -5], //---坐标轴名称相对位置
                        },
                        axisLine: { //---坐标轴 轴线
                            show: true, //---是否显示
                            lineStyle: {
                                color: '#C7D2CF',
                                width: 1,
                                type: 'solid',
                            },
                        },
                        axisLabel: {
                            fontSize: 22
                        }
                    },
                    //y轴显示
                    yAxis: {
                        data: this.pName,
                        splitLine: {
                            show: false
                        },
                        axisLine: { //---坐标轴 轴线
                            show: true, //---是否显示
                            lineStyle: {
                                color: '#C7D2CF',
                                width: 1,
                                type: 'dashed',
                            },
                        },
                        axisLabel: {
                            fontSize: 22
                        }
                    },
                    series: [
                        {
                            name: '已检人数',
                            type: 'bar',
                            data: this.yData,
                            barWidth: 38,
                            stack: '人数',
                            //显示颜色
                            itemStyle: {
                                normal: {
                                    color: '#4A4C5F'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    fontSize: 22
                                }
                            },
                        },
                        {
                            name: '未检人数',
                            type: 'bar',
                            data: this.wData,
                            barWidth: 38,
                            stack: '人数',
                            itemStyle: {
                                normal: {
                                    color: '#149799'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    fontSize: 22
                                }
                            },
                        }
                    ]
                };
                this.charts.setOption(this.option);
            }
        },
        mounted() {
            if (!this.charts) {
                this.charts = echarts.init(document.getElementById('main'));
            }
            let that = this;
            window.onresize = () => {
                that.charts.resize();
            };

            this.getReload();
            this.timer = setInterval(this.fnDate, 1000);
            // setInterval(this.getReload, 1000);
        },
        beforeDestroy() {
            clearInterval(this.timer);
            if (this.charts) {
                this.charts.dispose();
            }
            this.charts = null;
        }
    };
</script>

<style scoped>
    .main {
        width: 100%;
        height: 100%;
        padding: 52px 72px;
        background-color: #2C2C3F !important;
    }

    .top {
        display: flex;
        justify-content: space-between;
    }

    .btn-left {
        background: #FF7200;
        border-radius: 3px;
        color: #fff;
        font-size: 24px;
        display: inline-block;
        margin-right: 28px;
        padding: 4px 16px;
    }

    .tips {
        color: #fff;
        font-size: 38px;
        font-weight: 400;
        display: inline-block;
    }

    .line {
        border-bottom: 1px dashed #C7D2CF;
        opacity: 0.5;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .time {
        display: inline-block;
        color: #FEFEFE;
        font-size: 24px;
        font-weight: 300;
        float: right;
        margin-top: 25px;
        width: 320px;
    }

    .time img {
        margin-right: 15px;
        margin-bottom: -4px;
    }

    .satis-canvas {
        display: inline-block;
        width: 100%;

        margin: 0 auto;
    }
</style>
