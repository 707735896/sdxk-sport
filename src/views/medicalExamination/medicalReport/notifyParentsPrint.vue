<template>
    <div class="print">
        <Modal
            title="打印"
            :value="true"
            :mask-closable="false"
            :width="800"
            footer-hide
            class="printModal"
            @on-cancel="close"
        >
            <div class="print-wrapper">
                <div class="btn-div">
                    <img src="../../../assets/medicalExamination/print.png" alt="" style="cursor: pointer"
                         @click="printOne">
                </div>
                <div class="img-area demo-spin-container">
                    <template>
                        <!--startprint-->
                        <section ref="print">
                            <div class="qrcode" id="imhg" style="height: 100%; position: relative;">
                                <div v-for="item in notifyDatas" :key="item.stu_id" class="notifyParentPaper" style="page-break-after:always;">
                                    <div align="left" style="font-size:16px" class="notifyPar">
                                        <h2 style="text-align:center">告 家 长 书</h2>
                                        <div class="mar20 stuBaseInfo">
                                            <div class="item">
                                                <div class="xuexiao">
                                                    <span class="studata">{{item.school_name}}</span>
                                                    <span class="line"></span>
                                                </div>
                                                <span class="itenName">学校</span>
                                            </div>
                                            <div class="item grade">
                                                <div class="jianban">
                                                    <span class="studata">{{item.gc}}</span>
                                                    <span class="line"></span>
                                                </div>
                                                <span class="itenName"></span>
                                            </div>
                                            <div class="item stuname">
                                                <div class="xuesname">
                                                    <span class="studata">{{item.student_name}}</span>
                                                    <span class="line"></span>
                                                </div>
                                                <span class="itenName">同学家长：</span>
                                            </div>
                                        </div>
                                        <div class="mar20 stuCondition">
                                            &emsp;&emsp;您的孩子在这次体检中经初步检查为：<span :class="[!item.rvalue || item.rvalue.length<=18 ?'line':'']"></span><span :class="[item.rvalue && item.rvalue.length>18 ?'underLines':'']">{{item.rvalue}}</span>
                                        </div>
                                        <div class="mar20 notify">
                                            &emsp;&emsp;为了您孩子的健康，请到医院做进一步检查，并请把检查结果反馈给校卫生室（保健室）。
                                        </div>
                                        <div class="mar20 jgInfo">
                                            <div class="jgName">体检机构：{{item.hospital}}</div>
                                            <div class="docSign">体检医生签字：</div>
                                        </div>
                                        <div class="mar20 nowDate">
                                            <span>{{nowDate.year}}年</span>
                                            <span>{{nowDate.month}}月</span>
                                            <span>{{nowDate.day}}日</span>
                                        </div>
                                    </div>
                                    <div align="left" style="font-size:16px" class="parBack">
                                        <h2 style="text-align:center">家 长 回 执</h2>
                                        <div class="mar20 stuBaseInfo">
                                            <div class="item grade">
                                                <div class="jianban">
                                                    <span class="studata">{{item.gc}}</span>
                                                    <span class="line"></span>
                                                </div>
                                                <span class="itenName"></span>
                                            </div>
                                            <div class="item">
                                                <div class="xuesname">
                                                    <span class="studata">{{item.student_name}}</span>
                                                    <span class="line"></span>
                                                </div>
                                                <span class="itenName">同学</span>
                                            </div>
                                        </div>
                                        <div class="mar20 stuCondition">
                                            学生复检情况反馈：<span class="line"></span>
                                        </div>
                                        <div class="mar20 jgInfo">
                                            <div class="jgName">学生家长意见：<span class="line"></span> </div>
                                            <div class="docSign">学生家长签字：</div>
                                        </div>
                                        <div class="mar20 tjDate">
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
                    <Spin size="large" fix v-if="spinShow"></Spin>

                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import printJS from 'print-js';
    import urls from '../../../service/Urls';

    export default {
        name: 'printSummaryReport',
        props: ['student_id', 'title', 'flag', 'row'],
        data() {
            return {
                show: 1,
                spinShow: false,
                printHtml: '',
                topInfo: {
                    school: '',
                    grade: '',
                    class: '',
                    name: '',
                    sex: '',
                    IDcard: '',
                    date: '',
                    history: ''
                },
                phy_type: '',
                notifyDatas:[],
                nowDate: {
                    year:'',
                    month:'',
                    day:'',
                }

            };
        },
        methods: {
            // 打印
            printOne() {
                this.printHtmlCustomStyle();
            },
            // 打印样式
            printHtmlCustomStyle() {
                const style =
                    `@page {
                        margin: 40px 0 10px 0;
                        } @media print {
                        .notifyParentPaper {
                            width:700px;
                            font-size: 16px;
                            margin: 0px auto 10px;
                            margin-left:40px;
                        }
                        .mar20 {
                            margin-bottom: 50px
                        }
                        .notifyPar {
                            padding: 12px 10px 12px 10px;
                            border-bottom: 1px dotted #000;
                        }
                        .notifyPar h2 {
                            margin-bottom: 50px;
                        }
                        .stuBaseInfo {
                            margin-top: 20px;
                            width: 100%;
                        }
                        .stuBaseInfo .item {
                             position: relative;
                             display: inline-block;
                             margin-right: 40px;
                        }
                        .itenName {
                            position: absolute;
                            right: -40px;
                            bottom: 0;
                        }
                        .studata {
                            font-size: 14px;
                            padding: 0 6px;
                            box-sizing: border-box;
                        }
                        .stuBaseInfo .line {
                            position: absolute;
                            left: 0px;
                            bottom: 0px;
                            height: 4px;
                            width: 100%;
                            border-bottom: 1px solid #000;
                        }
                        .xuexiao {
                            width: 220px;
                            text-align:center;
                        }
                        .jianban{
                            width: 150px;
                            text-align:center;
                        }
                        .xuesname{
                            width: 160px;
                            text-align:center;
                        }

                        .stuname {
                             margin-right: 0px;
                         }
                        .stuname .itenName {
                             position: absolute;
                             right: -80px;
                             bottom: 0;
                         }
                         .item.grade {
                             margin-right: 5px;
                         }
                        .stuCondition {
                            position: relative;
                        }
                        .stuCondition .line {
                            position: absolute;
                            bottom: 0;
                            height: 1px;
                            width: 380px;
                            border-bottom: 1px solid #000;
                        }
                        .stuCondition .underLines {
                            border-bottom:1px solid #000;
                            padding:2px;
                        }
                        .jgInfo {
                            margin-top: 20px;
                            display: flex;
                        }
                        .jgName {
                            position: relative;
                            flex: 1.5
                        }
                        .docSign {
                            flex: 1
                        }
                        .tjDate,.nowDate {
                            text-align: right;
                        }
                        .tjDate span {
                            margin-left: 25px;
                        }

                        .parBack {
                            padding: 12px 10px 12px 10px;
                            margin-top: 40px;
                        }
                        .parBack h2 {
                            margin-bottom: 50px;
                        }
                        .parBack .jgInfo .jgName .line {
                            position: absolute;
                            bottom: 0;
                            height: 1px;
                            min-width: 250px;
                            border-bottom: 1px solid #000;
                        }
                        .parBack .stuCondition .line {
                            width: 540px;
                        }
                    }`;
                printJS({
                    printable: 'imhg',
                    type: 'html',
                    style: style,
                    scanStyles: false,
                    // 继承原来的所有样式
                    targetStyles: ['*']
                });
            },
            // 分析参数取值
            getDetailCondition(argu, type) {
                if (type === 1) {//皮肤
                    return this.skinCondition[argu] || '其他';
                } else if (type === 2) {//淋巴结
                    return this.lymphCondition[argu] || '其他';
                } else if (type === 3) {//胸部
                    return this.throaxCondition[argu] || '其他';
                } else if (type === 4) {//牙周
                    return this.periodontalCondition[argu] || '其他';
                } else if (type === 5) {//结核菌素
                    return this.tuberCondition[argu] || '阴性';
                } else if (type === 6) {//屈光不正
                    return this.qgCondition[argu] || '其他';
                } else if (type === 7) {//临床印象
                    return this.lcyxCondition[argu] || '其他';
                } else if (type === 8) {//戴镜情况
                    return this.djCondition[argu] || '其他';
                }
            },
            getPrintData() {
                this.$ajax({
                    url: urls.retest_single_info,
                    data: {
                        student_id: this.student_id[0],
                        type: 1
                    }

                }).then(data => {
                    if (data.code === 200) {

                        this.spinShow = false;
                        let res = data.data;
                        // 基本信息
                        this.topInfo.school = res.dep_id;
                        this.topInfo.grade = res.grade_name;
                        this.topInfo.class = res.class_name;
                        this.topInfo.name = res.student_name;
                        this.topInfo.sex = res.gender == 1 ? '男' : '女';
                        this.topInfo.is_boarding = res.is_boarding == 1 ? '是' : '否';
                        this.topInfo.IDcard = res.card_num;
                        this.topInfo.date = res.mainInspects.length !== 0 ? res.mainInspects[0].create_time : '';
                        //口腔科
                        if (res.stomatologys.length !== 0) {
                            this.tableData.stomatologys = res.stomatologys[0];
                        }
                        // 外科
                        if (res.surgerys.length !== 0) {
                            this.tableData.surgerys = res.surgerys[0];
                            this.tableData.surgerys.skin_str = res.surgerys[0].skin_str;
                            this.tableData.surgerys.lymph_str = res.surgerys[0].lymph_str;
                            this.tableData.surgerys.throax_str = res.surgerys[0].throax_str;
                        }
                        // 内科
                        this.tableData.internals = res.internals.length !== 0 ? res.internals[0] : {};


                    }

                });
            },
            close() {
                this.$emit('modal-close');
            },
        },
        created() {
            this.notifyDatas = this.row;
             var t = new Date();
             var y = t.getFullYear();
             var m = t.getMonth() + 1;
             var d = t.getDate();
             if (m < 10) {
                 m = '0' + m;
             }
             if (d < 10) {
                 d = '0' + d;
             }
             this.nowDate.year = y;
             this.nowDate.month = m;
             this.nowDate.day = d;

        }
    };
</script>
<style lang="less">
    .print-wrapper {
        display: flex;
        align-items: stretch;
        padding-bottom: 20px;

        .btn-div {
            width: 80px;
            position: relative;
        }

        .img-area {
            flex: 1;
            padding-left: 30px;
            height: 850px;
            overflow-x: hidden;
            overflow-y: auto;
            .notifyParentPaper {
                .mar20 {
                    margin-bottom: 38px
                }
                width: 638px;
                border: 1px solid #000;
                padding-top: 30px;
                .notifyPar {
                    padding: 12px 10px 12px 10px;
                    border-bottom: 1px solid #000;
                }
                .stuBaseInfo {
                 margin-top: 20px;
                 width: 100%;
                 .item {
                     position: relative;
                     display: inline-block;
                     margin-right: 40px;
                     .itenName {
                         position: absolute;
                         right: -40px;
                         bottom: 0;
                     }
                     .studata {
                         font-size: 14px;
                         padding: 0 6px;
                         box-sizing: border-box;
                     }
                     .line {
                         position: absolute;
                         left: 0px;
                         bottom: 0px;
                         height: 1px;
                         // width: 120px;
                         width: 100%;
                        border-bottom: 1px solid #000;
                     }
                     .xuexiao {
                         width: 216px;
                         text-align: center;
                     }
                     .jianban{
                         width: 150px;
                         text-align: center;
                     }
                     .xuesname{
                         width: 100px;
                         text-align: center;
                     }

                 }
                 .stuname {
                     margin-right: 0px;
                     .itenName {
                         position: absolute;
                         right: -80px;
                         bottom: 0;
                     }
                 }
                 .grade {
                     margin-right: 5px;
                 }

                }
                .stuCondition {
                    position: relative;
                    .line {
                        position: absolute;
                        bottom: 0;
                        height: 1px;
                        width: 300px;
                        border-bottom: 1px solid #000;

                    }
                    .underLines {
                        border-bottom: 1px solid #000;
                        padding:4px;
                    }
                }
                .jgInfo {
                    margin-top: 20px;
                    display: flex;
                    .jgName {
                        position: relative;
                        flex: 1.5
                    }
                    .docSign {
                        flex: 1
                    }
                }
                .tjDate {
                    text-align: right;
                    span {
                        margin-left: 25px;
                    }
                }
                .nowDate {
                    text-align: right;
                }

                .parBack {
                    padding: 12px 10px 12px 10px;
                    margin-top: 20px;
                    .jgInfo {
                        .jgName {
                            .line {
                                position: absolute;
                                bottom: 0;
                                height: 1px;
                                min-width: 250px;
                                border-bottom: 1px solid #000;
                            }
                        }
                    }
                    .stuCondition {
                        .line {
                            width: 460px;
                        }
                    }
                }

            }
            .notifyParentPaper {
                border-top-color: transparent;
                &:first-child {
                    border-top-color: #000;
                }
            }
        }

    }

    .demo-spin-container {
        position: relative;
    }
</style>

