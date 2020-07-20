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
            <div class="warapper">
                <div class="btn-div">
                    <img src="../../../assets/medicalExamination/print.png" alt="" style="cursor: pointer" @click="printOne">
                </div>
                <div class="img-area demo-spin-container">
                    <template>
                        <!--startprint-->
                        <section ref="print">
                        <div class="qrcode" id="imhg" style="height: 100%">
                                <div class="myPrintTable" style="">
                                    <div align="center">
                                        <h2>学生健康检查报告单</h2>
                                        <div class="baseInfo">
                                            <div class="item">
                                                <div style="width: 50%">
                                                学校：{{topInfo.school}}
                                                <span class="line school"></span>
                                                </div>
                                                <div style="width:25%">
                                                年级：{{topInfo.grade}}
                                                <span class="line grade"></span>
                                                </div>
                                                <div class="classStyle" style="width:25%">
                                                班级：{{topInfo.class}}
                                                <span class="line class"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width:20%">
                                                姓名：{{topInfo.name}}
                                                <span class="line name"></span>
                                                </div>
                                                <div class="gender">
                                                性别：{{topInfo.sex}}
                                                <span class="line sex"></span>
                                                </div>
                                                <div class="IDCard">
                                                身份证号：{{topInfo.IDcard}}
                                                <span class="line ID"></span>
                                                </div>
                                                <div class="time">
                                                体检日期：{{topInfo.date.split(' ')[0]}}
                                                <span class="line date"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width: 100%">
                                                    既往病史：{{topInfo.history}}
                                                    <span class="line history"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="reportTable" border="1" style="border-collapse: collapse;">
                                            <tr>
                                                <td rowspan="2"><div align="left">形体</div></td>
                                                <td><div align="left">身高</div></td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.height}}cm</div>
                                                </td>
                                                <td><div align="left">体重</div></td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.weight}}kg</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">体质指数</div></td>
                                                <td><div align="left">BMI</div></td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.bmi}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">生理功能</div></td>
                                                <td><div align="left">收缩压</div></td>
                                                <td>
                                                    <div align="left">{{tableData.ssy}}mmHg</div>
                                                </td>
                                                <td><div align="left">舒张压</div></td>
                                                <td>
                                                    <div align="left">{{tableData.szy}}mmHg</div>
                                                </td>
                                                <td><div align="left">脉搏</div></td>
                                                <td>
                                                    <div align="left">{{tableData.mb}}次/分</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="4"><div align="left">眼科</div></td>
                                                <td rowspan="2"><div align="left">视力</div></td>
                                                <td><div align="left">右眼</div></td>
                                                <td><div align="left">{{tableData.r_eyesight}}</div></td>
                                                <td rowspan="2"><div align="left">矫正视力</div></td>
                                                <td><div align="left">右眼</div></td>
                                                <td><div align="left">{{tableData.l_eyesight}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">右眼</div></td>
                                                <td><div align="left">{{tableData.r_bcva}}</div></td>
                                                <td><div align="left">左眼</div></td>
                                                <td><div align="left">{{tableData.l_bcva}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">屈光</div></td>
                                                <td><div align="left">{{tableData.ophthalmologys.l_dioptric === 1? '否':'是'}}</div></td>
                                                <td><div align="left">近视</div></td>
                                                <td><div align="left">{{tableData.ophthalmologys.l_myopia === 1? '否':'是'}}</div></td>
                                                <td><div align="left">沙眼</div></td>
                                                <td><div align="left">{{tableData.ophthalmologys.r_trachoma === 1? '无':'有'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">结膜炎</div></td>
                                                <td><div align="left">{{tableData.ophthalmologys.conjunctivitis === 1? '无':'有'}}</div></td>
                                                <td><div align="left">色觉</div></td>
                                                <td colspan="3"><div align="left">{{tableData.ophthalmologys.color_blindness === 1? '正常':'异常'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td rowspan="5"><div align="left">口腔</div></td>
                                                <td><div align="left">齿列</div></td>
                                                <td><div align="left">{{tableData.stomatologys.dentition === 1 ? '整齐':'不齐'}}</div></td>
                                                <td><div align="left">牙周</div></td>
                                                <td colspan="3"><div align="left">{{tableData.stomatologys.periodontal}}</div></td>
                                            </tr>
                                            <tr>
                                                <td rowspan="3"><div align="left">有无龋齿</div></td>
                                                <td rowspan="3"><div align="left">{{tableData.stomatologys.decayed_tooth === 1? '无':'有'}}</div></td>
                                                <td><div align="left">龋患牙数</div></td>
                                                <td colspan="3"><div align="left">{{tableData.stomatologys.he_broken}}颗</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">龋失牙数</div></td>
                                                <td colspan="3"><div align="left">{{tableData.stomatologys.he_lose}}颗</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">龋补牙数</div></td>
                                                <td colspan="3"><div align="left">{{tableData.stomatologys.he_repair}}颗</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">其他记录</div></td>
                                                <td colspan="5"><div align="left"></div></td>
                                            </tr>
                                            <tr>
                                                <td rowspan="4"><div align="left">外科</div></td>
                                                <td><div align="left">皮肤</div></td>
                                                <td><div align="left">{{tableData.surgerys.skin}}</div></td>
                                                <td><div align="left">淋巴结</div></td>
                                                <td><div align="left">{{tableData.surgerys.lymph}}</div></td>
                                                <td><div align="left">头部</div></td>
                                                <td><div align="left">{{tableData.surgerys.head === 1?'正常':'异常'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">颈部</div></td>
                                                <td><div align="left">{{tableData.surgerys.neck === 1?'正常':'异常'}}</div></td>
                                                <td><div align="left">脊柱</div></td>
                                                <td><div align="left">{{tableData.surgerys.spine === 1?'正常':'变形'}}</div></td>
                                                <td><div align="left">四肢</div></td>
                                                <td><div align="left">{{tableData.surgerys.legs === 1?'正常':'残疾'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">胸部</div></td>
                                                <td colspan="5"><div align="left">{{tableData.surgerys.throax}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">其他记录</div></td>
                                                <td colspan="5"><div align="left"></div></td>
                                            </tr>
                                            <tr>
                                                <td rowspan="4"><div align="left">内科</div></td>
                                                <td colspan="2"><div align="left">近期不适症状</div></td>
                                                <td colspan="4"><div align="left"></div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">心率</div></td>
                                                <td><div align="left">{{tableData.internals.heart_rate}}次/分</div></td>
                                                <td><div align="left">心脏杂音</div></td>
                                                <td><div align="left">{{tableData.internals.cardiac_souffle === 1? '无':'有'}}</div></td>
                                                <td><div align="left">心律</div></td>
                                                <td><div align="left">{{tableData.internals.cardiac_rhythm === 1 ? '齐': tableData.internals.cardiac_rhythm === 2 ? '不齐':'绝对不齐'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">肺部罗音</div></td>
                                                <td><div align="left">{{tableData.internals.lung_rale === 1?'无':tableData.internals.lung_rale === 2?'干罗音':'湿罗音'}}</div></td>
                                                <td><div align="left">肝</div></td>
                                                <td><div align="left">{{tableData.internals.liver === 1?'正常':'肝大'}}</div></td>
                                                <td><div align="left">脾</div></td>
                                                <td><div align="left">{{tableData.internals.spleen === 1?'正常':'脾大'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">其他记录</div></td>
                                                <td colspan="5"><div align="left"></div></td>
                                            </tr>
                                            <tr>
                                                <td rowspan="3"><div align="left">化验</div></td>
                                                <td><div align="left">肝功能ALT</div></td>
                                                <td><div align="left">{{tableData.clinicalLabs.alt}}u/l</div></td>
                                                <td><div align="left">肝功能TBIL</div></td>
                                                <td><div align="left">{{tableData.clinicalLabs.tbil}}μmol/l</div></td>
                                                <td><div align="left">血红蛋白</div></td>
                                                <td><div align="left">{{tableData.clinicalLabs.hemoglobin}}g/l</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">结核菌素试验</div></td>
                                                <td colspan="5"><div align="left">{{tableData.skinTests.res}}</div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">其他化验结果</div></td>
                                                <td colspan="5"><div align="left"></div></td>
                                            </tr>
                                            <tr>
                                                <td><div align="left">检查</div></td>
                                                <td><div align="left">胸部X线检查</div></td>
                                                <td colspan="5"><div align="left">{{tableData.inspects.x_ray === 1?'未见异常':'异常'}}</div></td>
                                            </tr>
                                            <tr class="jielun">
                                                <td><div align="left">本次体检结论</div></td>
                                                <td colspan="6"><div align="left">{{tableData.mainInspects.main_result}}</div></td>
                                            </tr>

                                            <tr class="zhidao">
                                                <td><div align="left">健康指导</div></td>
                                                <td colspan="6">
                                                    <div align="left">{{tableData.mainInspects.health_guide}}</div>
                                                    <div class="sign">
                                                        <span>家长签字：</span>
                                                        <span class="date">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
<!--                                        <div class="jigou">苏州市疾病预防控制中心</div>-->
                                    </div>
                                </div>
                        </div>
                        </section>
                        <!--endprint-->
                    </template>
                <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->

                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import printJS from "print-js";
    import urls from '../../../service/Urls';
    export default {
        name: 'printSummaryReport',
        // props: ['planCode','year','studentCode', 'title', 'flag'],
        props: ['student_id', 'title', 'flag'],
        data() {
            return {
                show: 1,
                // spinShow: true,
                printHtml: "",
                topInfo:{
                    school:'',
                    grade:'',
                    class:'',
                    name:'',
                    sex:'',
                    IDcard:'',
                    date:'',
                    history:'无'
                },
                tableData:{
                    // 眼科
                    ophthalmologys: {},
                    // 口腔
                    stomatologys:{},
                    // 外科
                    surgerys:{},
                    // 内科
                    internals: {},
                    // 化验
                    clinicalLabs: {},
                    inspects:{},
                    skinTests:{},
                    // 结论
                    mainInspects:{}
                },
                // 口腔--牙周
                periodontalCondition: {
                    1:'阴性',
                    2:'牙龈炎',
                    3:'牙石',
                    4:'浅牙周袋',
                    5:'深牙周袋',
                },
                // 皮肤
                skinCondition : {
                    1:'正常',
                    2:'潮红',
                    3:'发白',
                    4:'发绀',
                    5:'黄染',
                    6:'色素沉着',
                    7:'湿疹',
                    8:'糜烂'
                },
                // 淋巴结
                lymphCondition : {
                    1:'未触及',
                    2:'锁骨上',
                    3:'腋窝'
                },
                // 胸部
                throaxCondition : {
                    1:'正常',
                    2:'桶状胸',
                    3:'扁平胸',
                    4:'鸡胸',
                    5:'漏斗胸'
                },
                // 结核菌素
                tuberCondition : {
                    1:'阳性',
                    2:'一般阳性',
                    3:'中度阳性',
                    4:'强阳性',
                    5:'阴性正常'
                },

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
                    `@page { margin: 0 } @media print {
                        .myPrintTable {
                            width:630px;
                            font-size: 14px;
                            margin: 40px auto;
                            margin-left:60px;
                        }
                        .myPrintTable .baseInfo {
                                margin-bottom: 10px;
                                font-size:14px;
                        }
                        .baseInfo .item{
                            height: 30px;
                            margin-top: 12px;
                        }
                        .baseInfo .item>div{
                            float:left;
                            position:relative;
                            text-align: left;
                            // margin-right: 18px;
                        }

                        .item>div .line {
                                position: absolute;
                                height: 1px;
                                border-bottom: 1px solid #000;
                                top: 20px;

                        }
                        .baseInfo .school {
                                width: 260px;
                                left: 40px;
                        }
                        .classStyle {
                            margin-left:0px;
                        }
                        .baseInfo .ID{
                                    width: 152px;
                                    left: 66px;
                        }
                        .baseInfo .date {
                                    width: 124px;
                                    left: 66px;
                        }
                        .baseInfo .IDCard {
                            width: 228px;
                        }
                        .baseInfo .gender {
                            width: 80px;
                        }
                        .baseInfo .sex {
                            width: 30px;
                            left:40px;
                        }
                        .baseInfo .history {
                                    width: 562px;
                                    left: 66px;
                        }
                        .baseInfo  .name {
                                width: 60px;
                                left: 40px;
                        }
                        .baseInfo .grade,.baseInfo  .class {
                                width: 110px;
                                left: 40px;
                        }
                        .reportTable {
                            width:660px;
                        }
                        .reportTable tr td {
                            min-width: 82px;
                            padding: 3px;
                            padding-left: 6px;
                        }
                        .reportTable .jielun {
                            height:90px;
                        }
                        .reportTable .zhidao {
                            height:110px;
                            position:relative;
                        }
                        .sign{
                            position: absolute;
                            bottom: 106px;
                            right: 90px;
                        }
                        .sign .date {
                                margin-left: 50px;
                        }
                        .myPrintTable .jigou {
                            text-align: right!important;
                            margin-top: 10px;
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
            // 分析参数取值
            getDetailCondition(argu, type) {
                if(type === 1) {//皮肤
                    return this.skinCondition[argu] || '其他'
                } else if(type === 2) {//淋巴结
                    return this.lymphCondition[argu] || '其他'
                } else if(type === 3) {//胸部
                    return this.throaxCondition[argu] || '其他'
                } else if(type === 4) {//牙周
                    return this.periodontalCondition[argu] || '其他'
                } else if(type === 5) {//结核菌素
                    return this.tuberCondition[argu] || '阴性'
                }
            },

           close() {
               this.$emit('modal-close');
           },
        },
        created() {
            // this.$ajax({
            //         url:urls.retest_single_info,
            //         data:{
            //             // plan_code:this.planCode,
            //             // year:this.year,
            //             // student_code:this.studentCode,
            //             student_id: this.student_id,
            //             type:1
            //         }

            //     }).then(data =>{

            //     })

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

            .img-page {
                position: absolute;
                bottom: 0;
                width: 100%;
                text-align: center;
            }
        }

        .img-area {
            flex: 1;
            padding-left: 40px;
            .myPrintTable {
                border: 1px solid #000;
                width:630px;
                padding:12px 34px 12px 24px;
                margin-bottom: 10px;
                .jigou {
                    text-align: right!important;
                    margin-top: 10px;
                }
                .baseInfo {
                    margin-bottom: 8px;
                    font-size: 12px;
                    .item {
                        margin-top: 10px;
                        height: 25px;
                        .gender {
                            width: 12%;
                        }
                        .IDCard {
                            width: 38%;
                        }
                        .time {
                            width: 30%;
                        }
                        div {
                            float: left;
                            text-align: left;
                            position: relative;
                            .line {
                                position: absolute;
                                width: 100px;
                                border-bottom: #333 1px solid;
                                left: 32px;
                                top: 20px;

                            }
                            .school {
                                    width: 230px;
                            }
                            .ID,.date {
                                    width: 144px;
                                    left: 56px;
                            }
                            .date {
                                    width: 103px;
                            }
                            .sex {
                                    width: 24px;
                            }
                            .name {
                                width: 66px;
                            }
                            .history {
                                    width: 498px;
                                    left: 56px;
                            }
                        }

                    }
                }
            }
        }

    }
    .reportTable {
        width: 554px;
        tr td {
            min-width: 83px;
            padding: 1px;
            padding-left: 5px;
        }
        .jielun {
                height:70px;
            }
        .zhidao {
            position: relative;
            height:93px;
            .sign{
                position: absolute;
                bottom: 56px;
                right: 66px;
                .date {
                    margin-left: 50px;
                }
            }
        }
    }
    .demo-spin-container{
        position: relative;
    }
</style>

