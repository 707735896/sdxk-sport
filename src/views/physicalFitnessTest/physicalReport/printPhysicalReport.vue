<template>
    <div class="print">
        <Modal
                title="打印"
                :value="true"
                :mask-closable="false"
                :width="800"
                footer-hide
                class="reportsPrint"
                @on-cancel="close"
        >
            <div class="warapper">
                <div class="btn-div">
                    <img src="../../../assets/medicalExamination/print.png" alt="" style="cursor: pointer"
                         @click="printOne">
                </div>
                <div class="img-area demo-spin-container">
                    <template>
                        <!--startprint-->
                        <section ref="print">
                            <div class="qrcode" id="imhg" style="height: 100%">
                                <!--<div class="myPrintTable" v-for="item of data" :key="item.student_code">-->
                                <div class="myPrintTable">
                                    <div align="center" class="reportPrintStyle">
                                        <h2>学生体能测试报告单</h2>
                                        <div class="baseInfo">
                                            <div class="item">
                                                <div style="width: 40%">
                                                    学校：{{topInfo.student_school}}
                                                    <span class="line school"></span>
                                                </div>
                                                <div style="width:40%">
                                                    年级：{{topInfo.student_graden}}
                                                    <span class="line grade"></span>
                                                </div>
                                                <div class="classStyle" style="width:20%">
                                                    班级：{{topInfo.student_class}}
                                                    <span class="line class"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width: 40%">
                                                    姓名：{{topInfo.student_name}}
                                                    <span class="line"></span>
                                                </div>
                                                <div style="width:40%">
                                                    性别：{{topInfo.student_gender}}
                                                    <span class="line"></span>
                                                </div>
                                                <div class="classStyle" style="width:20%">
                                                    民族：{{topInfo.student_nation}}
                                                    <span class="line class"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width: 50%">
                                                    学籍号：{{topInfo.student_code}}
                                                    <span class="line long"></span>
                                                </div>
                                                <div style="width:50%">
                                                    出生日期：{{topInfo.student_brith}}
                                                    <span class="line birthDate"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="reportTable table-bordered" border="1"
                                               style="border-collapse: collapse;">
                                            <tbody>
                                            <tr>
                                                <td width="80" rowspan="2">形体</td>
                                                <td>身高</td>
                                                <td>185.5cm</td>
                                                <td>体重</td>
                                                <td>86kg</td>
                                                <td>BMI</td>
                                                <td>25</td>
                                                <td width="80" rowspan="2">测试人</td>
                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>100</td>
                                                <td>占比</td>
                                                <td>15%</td>
                                                <td>加权</td>
                                                <td>15</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">肺活量</td>
                                                <td>成绩</td>
                                                <td colspan="5">1860ml</td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>100</td>
                                                <td>占比</td>
                                                <td>15%</td>
                                                <td>加权</td>
                                                <td>15</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">坐位体前屈</td>
                                                <td>成绩</td>
                                                <td colspan="5">13.5cm</td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>90</td>
                                                <td>占比</td>
                                                <td>30%</td>
                                                <td>加权</td>
                                                <td>25</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">1分钟跳绳</td>
                                                <td>成绩</td>
                                                <td colspan="5">160次</td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>90</td>
                                                <td>占比</td>
                                                <td>30%</td>
                                                <td>加权</td>
                                                <td>25</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">立定跳远</td>
                                                <td>成绩</td>
                                                <td colspan="5">163cm</td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>90</td>
                                                <td>占比</td>
                                                <td>30%</td>
                                                <td>加权</td>
                                                <td>25</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">1分钟仰卧起坐</td>
                                                <td>成绩</td>
                                                <td colspan="5">101次</td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>85</td>
                                                <td>占比</td>
                                                <td>30%</td>
                                                <td>加权</td>
                                                <td>25</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">引体向上</td>
                                                <td>成绩</td>
                                                <td colspan="5"></td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>85</td>
                                                <td>占比</td>
                                                <td>30%</td>
                                                <td>加权</td>
                                                <td>25</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">50米跑</td>
                                                <td>成绩</td>
                                                <td colspan="5">9秒</td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td>85</td>
                                                <td>占比</td>
                                                <td>30%</td>
                                                <td>加权</td>
                                                <td>25</td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">50米*8</td>
                                                <td>成绩</td>
                                                <td colspan="5"></td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td></td>
                                                <td>占比</td>
                                                <td></td>
                                                <td>加权</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">800米</td>
                                                <td>成绩</td>
                                                <td colspan="5"></td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td></td>
                                                <td>占比</td>
                                                <td></td>
                                                <td>加权</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td width="80" rowspan="2">1000米</td>
                                                <td>成绩</td>
                                                <td colspan="5"></td>
                                                <td width="80" rowspan="2">测试人</td>

                                            </tr>
                                            <tr>
                                                <td>得分</td>
                                                <td></td>
                                                <td>占比</td>
                                                <td></td>
                                                <td>加权</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td style="font-weight: 700">总分</td>
                                                <td colspan="7"></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div align="right" class="sign">
                                            <span>家长签字：</span>
                                            <span>年</span>
                                            <span>月</span>
                                            <span>日</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <!--endprint-->
                    </template>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import printJS from "print-js";
    import urls from '../../../service/Urls';

    export default {
        name: 'printPhysicalReport',
        props: ['id', 'title', 'flag', 'data'],
        data() {
            return {
                printHtml: "",
                topInfo: {
                    // student_school: '苏州工业园区金鸡湖学校',
                    // student_graden: '小学二年级',
                    // student_class: '二年级3班',
                    // student_name: '张三三',
                    // student_gender: '男',
                    // student_nation: '汉',
                    // student_code: '896542123654782133',
                    // student_brith: '2010-08-08',
                    student_school: '',
                    student_graden: '',
                    student_class: '',
                    student_name: '',
                    student_gender: '',
                    student_nation: '',
                    student_code: '',
                    student_brith: ''
                },
                body: {
                    othervalue1: 144,
                    othervalue2: 54,
                    proportion: 0.1,
                    resultvalue: 26.04,
                    score: 110,
                    weighted_score: 11,
                },// 形体
                lung:{}, //肺活量
                sit:{},//坐位体前屈
                rope:{},//1分钟跳绳
                jump:{},//立定跳远
                situp:{},//1分钟仰卧起坐
                pullup:{},//引体向上
                run50:{},//50米跑
                run400:{},//50米*8
                run800:{},//800米
                run1000:{}//1000米
            }
        },
        methods: {
            // 打印
            printOne() {
                this.printHtmlCustomStyle();
            },
            // 打印样式
            printHtmlCustomStyle() {
                const style =
                    `@page { margin: 0 } @media print {
                        .myPrintTable {
                            font-size: 14px;                          
                            margin: 0px auto;
                            box-sizing:border-box;
                            border:1px solid transparent;
                        }
                        .reportTable {
                            width: 640px;    
                         }
                        .reportTable tr td {
                            min-width: 68px;
                            padding: 9px 5px;
                        }
                        .myPrintTable .baseInfo {
                            margin-bottom: 20px;
                            font-size:14px;
                        }
                        .baseInfo>.item {
                            margin-top: 14px;
                            height: 25px;
                        }
                        .item>div {
                            float: left;
                            text-align: left;
                            position: relative;
                        }
                        .baseInfo .line {
                            position: absolute;
                            width: 170px;
                            border-bottom: #333 1px solid;
                            left: 32px;
                            top: 20px;

                        } 
                        .baseInfo .class {
                            width: 90px;
                        }
                        .baseInfo .long {
                            width: 240px;
                            left: 44px;
                        }
                        .baseInfo .birthDate {
                            width: 256px;
                            left: 55px;
                        }
                        .sign {
                            margin-top: 10px;
                        }
                        .sign>span {
                            margin-left: 30px;
                        }
                        .sign span:nth-child(2) {
                            margin-left: 80px;
                        }

                    }`;
                printJS({
                    printable: "imhg",
                    type: "html",
                    style: style,
                    scanStyles: false,
                    // 继承原来的所有样式
                    targetStyles: ['*']
                });
            },
            search(){
                let data = {};
                data.cardOrCode = this.data[0].student_code;
                data.year = this.data[0].year + "";
                this.$ajax({ // 学校
                    url: urls.elecPhysicalReport_analyze,
                    data: data
                }).then(data => {
                    if (data.code === 200) {
                        // this.infomodalData = data.data[0];
                        let tempList = [];
                        let de = data.data[0].fitnessForms;
                        this.topInfo = {
                            student_school: data.data[0].student_school,
                            student_graden: data.data[0].student_graden,
                            student_class: data.data[0].student_class,
                            student_name: data.data[0].student_name,
                            student_gender: data.data[0].student_gender,
                            student_nation: data.data[0].student_nation,
                            student_code: data.data[0].student_code,
                            student_brith: data.data[0].student_brith,
                        };
                        for (let i = 0; i < de.length; i++) {
                            if(de[i].fitness === 'BMI'){
                                this.body = de[i]
                            }else if(de[i].fitness === '肺活量'){
                                this.lung = de[i]
                            }else if(de[i].fitness === '坐位体前屈'){
                                this.sit = de[i]
                            }else if(de[i].fitness === '1分钟跳绳'){
                                this.rope = de[i]
                            }else if(de[i].fitness === '立定跳远'){
                                this.jump = de[i]
                            }else if(de[i].fitness === '1分钟仰卧起坐'){
                                this.situp = de[i]
                            }else if(de[i].fitness === '引体向上'){
                                this.pullup = de[i]
                            }else if(de[i].fitness === '50米跑'){
                                this.run50 = de[i]
                            }else if(de[i].fitness === '50米*8往返跑'){
                                this.run400 = de[i]
                            }else if(de[i].fitness === '800米'){
                                this.run800 = de[i]
                            }else if(de[i].fitness === '1000米'){
                                this.run1000 = de[i]
                            }
                            // if (this.infomodalData.fitnessForms[i].fitness === 'BMI') {
                            //     this.info_count = this.info_count + this.infomodalData.fitnessForms[i].weighted_score;
                            //     this.infomodalData.body = this.infomodalData.fitnessForms[i];
                            //     this.infomodalData.body.othervalue1 = this.infomodalData.body.othervalue1 + 'cm';
                            //     this.infomodalData.body.othervalue2 = this.infomodalData.body.othervalue2 + 'kg';
                            // } else {
                            //     this.info_count = this.info_count + this.infomodalData.fitnessForms[i].weighted_score;
                            //     this.infomodalData.fitnessForms[i].score = this.infomodalData.fitnessForms[i].score + this.infomodalData.fitnessForms[i].unit;
                            //     tempList.push(this.infomodalData.fitnessForms[i]);
                            // }
                        }
                        // this.infomodalData.fitnessForms = tempList;
                        // this.infomodalData.student_brith = this.numToDate(this.infomodalData.student_brith);
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created(){
            console.log()
            this.search();
        }
    };
</script>
<style scoped lang="less">
    .warapper {
        display: flex;
        align-items: stretch;
        /*height: 320px;*/

        .btn-div {
            width: 80px;
            position: relative;
        }

        .img-area {
            flex: 1;
            padding-left: 40px;

            img {
                display: block;
                width: 100%;
            }

            .myPrintTable {
                border: 1px solid #000;
                padding: 12px 34px 12px 24px;
                margin-bottom: 10px;

                .baseInfo {
                    margin-bottom: 8px;
                    font-size: 12px;

                    .item {
                        margin-top: 10px;
                        height: 25px;

                        div {
                            float: left;
                            text-align: left;
                            position: relative;

                            .line {
                                position: absolute;
                                width: 170px;
                                border-bottom: #333 1px solid;
                                left: 32px;
                                top: 20px;

                            }

                            .class {
                                width: 90px;
                            }

                            .long {
                                width: 211px;
                                left: 44px;
                            }

                            .birthDate {
                                width: 238px;
                                left: 55px;
                            }
                        }

                    }
                }

                .reportTable {
                    width: 580px;
                    tr td {
                        min-width: 60px;
                        padding: 5px;
                        // padding-left: 5px;
                    }
                }

                .sign {
                    margin-top: 10px;

                    span {
                        margin-left: 30px;

                        &:nth-child(2) {
                            margin-left: 80px;
                        }
                    }

                }

            }
        }
    }

    .demo-spin-container {
        position: relative;
    }
</style>


