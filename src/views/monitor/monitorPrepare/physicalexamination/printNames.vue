
<template>
    <div class="print">
        <Modal
                title="打印"
                :value="true"
                :mask-closable="false"
                :width="800"
                footer-hide
                class="examinationReportsPrint"
                @on-cancel="close"
        >
            <div class="warapper">
                <div class="btn-div">
                    <img src="../../../../assets/monitor/print1.png" alt="" style="cursor: pointer" @click="printOne">
                </div>
                <div class="img-area demo-spin-container">
                    <template>
                        <!--startprint-->
                        <section ref="print">
                            <div class="qrcode" id="imhg" style="height: 100%">
                                <div class="myPrintTable" v-for="(item,i) in printDatas" :key="i" style="page-break-after:always;min-height:730px;margin-bottom: 30px;">
                                    <!-- //v-for="item in data" :key="item.student_code" -->
                                    <div align="center" class="reportPrintStyle">
                                        <h2>体质抽查名单</h2>
                                         <div class="baseInfo">
                                            <div class="item">
                                                <div style="width: 49%">
                                                区域：{{item.area_name}}
                                                <span class="line class"></span>
                                                </div>
                                                <div style="width:51%">
                                                学校：{{item.school_name}}
                                                <span class="line grade"></span>
                                                </div>
                                                <div class="classStyle" style="width:49%;;margin:10px 0;">
                                                学年：{{localYear}}-{{Number(localYear) +1}}
                                                <span class="line class"></span>
                                                </div>
                                                <!-- <div class="classStyle" style="width:51%;margin:10px 0;">
                                                学期：{{item.term === 1?'第一学期':'第二学期'}}
                                                <span class="line grade"></span>
                                                </div> -->
                                            </div>
                                        </div>
                                        <table class="reportTable table-bordered" border="1" style="border-collapse: collapse;">
                                            <tbody>
                                                <tr align="center">
                                                    <td width="40">序号</td>
                                                    <td>年级</td>
                                                    <td>班级</td>
                                                    <td>姓名</td>
                                                    <td>性别</td>
                                                    <td>年龄</td>
                                                    <td>住宿否</td>
                                                </tr>
                                                <tr align="center" v-for="(item1,j) in item.monStuList" :key="j">
                                                    <td>{{j+1}}</td>
                                                    <td>{{item1.grade_name}}</td>
                                                    <td>{{item1.class_name}}</td>
                                                    <td>{{item1.student_name}}</td>
                                                    <td>{{item1.gender===1?'男':'女'}}</td>
                                                    <td>{{item1.age}}</td>
                                                    <td>{{item1.is_boarding == 1?'是':'否'}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
    import urls from '../../../../service/Urls';
    import {yearLists,todayYear} from "@/libs/dateUtils";

    export default {
        name: 'printPhysicalReport',
        props: ['id', 'title', 'flag','data'],
        data(){
            return {
                 printHtml: "",
                 printDatas:[],
                 localYear:''
            }
        },
        methods:{
             // 打印
            printOne() {
                let self = this;
                this.$confirm({
                    text: '确认打印所选数据信息？',
                    onOk: function () {
                        self.printHtmlCustomStyle();
                    },
                    cancel: function () {
                        return;
                    }
                });
            },
            // 打印样式
            printHtmlCustomStyle() {
                const style =
                    `@page { margin: 0 } @media print {
                        @page {
                            margin: 42px 0 60px;
                        }
                        .myPrintTable {
                            width:676px;
                            font-size: 14px;
                            margin: 0px auto;
                            box-sizing:border-box;
                            border:1px solid transparent;
                            height: 100%;
                        }
                        .reportTable {
                            width: 676px;
                         }
                        .reportTable tr td {
                            min-width: 68px;
                            padding: 7px 5px;
                        }
                        .myPrintTable .baseInfo {
                            margin-bottom: 39px;
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
                            width: 270px;
                        }
                        .baseInfo .grade {
                            width: 290px;
                            left: 44px;
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
            getPrintDatas() {
                this.printDatas = []
                 this.$ajax({
                    url: urls.monitorStu_all_stu,
                    data: {
                        dep_ids:this.id,
                        year: this.localYear
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.printDatas = data.data

                    } else {
                    }
                }).catch(err => {
                });
            },
            close() {
                this.$emit('modal-close');
            },

        },
        mounted() {
            this.localYear = todayYear()
            this.getPrintDatas()
            // this.data = this.virtualData
        },
    };
</script>
<style scoped lang="less">

    .warapper{
        display: flex;
        align-items: stretch;
        /*height: 320px;*/
        .btn-div{
            width: 80px;
            position: relative;
        }

        .img-area{
            flex: 1;
            height: 100%;
            max-height: 760px;
            overflow-x: hidden;
            overflow-y: auto;
            padding-left: 40px;
            img{
                display: block;
                width: 100%;
            }
            .myPrintTable {
                border: 1px solid #000;
                width:630px;
                padding:12px 22px 12px 24px;
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
                                width: 135px;
                                border-bottom: #333 1px solid;
                                left: 32px;
                                top: 20px;

                            }
                            .class {
                                width: 230px;
                            }
                            .grade {
                                width: 250px;
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

    .demo-spin-container{
        position: relative;
    }
    .examinationReportsPrint {
        .ivu-modal {
            top: 54px!important;
        }
    }


</style>


