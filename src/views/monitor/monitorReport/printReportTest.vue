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
                    <img src="../../../assets/medicalExamination/print.png" alt="" style="cursor: pointer"
                         @click="printOne">
                </div>
                <div class="img-area demo-spin-container">
                    <template>
                        <!--startprint-->
                        <section ref="print">
                            <div class="qrcode" id="imhg" style="height: 100%">
                                <div class="myPrintTable" style="">
                                    <div align="center">
                                        <h2>学生体质监测检查报告单</h2>
                                        <div class="baseInfo">
                                            <div class="item">
                                                <div style="width: 44%">
                                                    学校：{{topInfo.school_name}}
                                                    <span class="line school"></span>
                                                </div>
                                                <div style="width:21%">
                                                    年级：{{topInfo.grade}}
                                                    <span class="line grade"></span>
                                                </div>
                                                <div class="classStyle" style="width:19%">
                                                    班级：{{topInfo.class}}
                                                    <span class="line class"></span>
                                                </div>
                                                <div style="width:16%">
                                                    姓名：{{topInfo.name}}
                                                    <span class="line name"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="gender">
                                                    性别：{{topInfo.sex}}
                                                    <span class="line sex"></span>
                                                </div>
                                                <div style="width:17%">
                                                    民族：{{topInfo.student_nation}}
                                                    <span class="line name"></span>
                                                </div>
                                                <div class="time">
                                                    体检日期：{{topInfo.date && topInfo.date.split(' ')[0]}}
                                                    <span class="line date"></span>
                                                </div>
                                                <div class="IDCard">
                                                    身份证号：{{topInfo.IDcard}}
                                                    <span class="line ID"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width: 100%">
                                                    既往病史：{{topInfo.anamnesis}}
                                                    <span class="line history"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="reportTable" border="1" style="border-collapse: collapse;">
                                            <tr>
                                                <td colspan="1">
                                                    <div align="left">一般</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">身高</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.height}}cm</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">体重</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.weight}}kg</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">体质指数BMI</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.bmi}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="1">
                                                    <div align="left">胸围</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">{{tableData.chest}}cm</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="1">
                                                    <div align="left">生理功能</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">收缩压</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.ssy}}mmHg</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">舒张压</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.szy}}mmHg</div>
                                                </td >
                                                <td colspan="1">
                                                    <div align="left">脉搏</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.mb}}次/分</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="1">
                                                    <div align="left">肺活量</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">{{tableData.vital_capacity}}ml</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="1" rowspan="3">
                                                    <div align="left">视力</div>
                                                </td>
                                                <td rowspan="2">
                                                    <div align="left">裸眼视力</div>
                                                </td>
                                                <td>
                                                    <div align="left">右眼</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.l_eyesight}}</div>
                                                </td>
                                                <td rowspan="2">
                                                    <div align="left">戴镜视力</div>
                                                </td>
                                                <td>
                                                    <div align="left">右眼</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.r_eyesight}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">左眼</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.l_bcva}}</div>
                                                </td>
                                                <td>
                                                    <div align="left">左眼</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.r_bcva}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">屈光临床印象</div>
                                                </td>
                                                <td colspan="5">
                                                    <div align="left">{{tableData.qglcyx}}</div>
                                                </td>
                                            </tr>
                                            <!--<tr>-->
                                                <!--<td rowspan="2">屈光不正</td>-->
                                                <!--<td><div align="left">右眼</div></td>-->
                                                <!--<td colspan="4"><div align="left">{{tableData.pd}}</div></td>-->
                                            <!--</tr>-->
                                            <!--<tr>-->
                                                <!--<td><div align="left">左眼</div></td>-->
                                                <!--<td colspan="4"><div align="left">{{tableData.l_a}}</div></td>-->
                                            <!--</tr>-->
                                            <tr>
                                                <td rowspan="4">
                                                    <div align="left">口腔</div>
                                                </td>
                                                <td>
                                                    <div align="left">齿列</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.dentition === 1 ? '整齐':'不齐'}}</div>
                                                </td>
                                                <td>
                                                    <div align="left">牙周</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.periodontal}}</div>
                                                </td>
                                                <td>
                                                    <div align="left">有无龋齿</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.decayed_tooth === 1? '无':'有'}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2">
                                                    <div align="left">龋患</div>
                                                </td>
                                                <td>
                                                    <div align="left">恒牙{{tableData.he_broken}}</div>
                                                </td>
                                                <td rowspan="2">
                                                    <div align="left">龋失</div>
                                                </td>
                                                <td>
                                                    <div align="left">恒牙{{tableData.he_lose}}</div>
                                                </td>
                                                <td rowspan="2">
                                                    <div align="left">龋补</div>
                                                </td>
                                                <td>
                                                    <div align="left">恒牙{{tableData.he_repair}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">乳牙{{tableData.he_broken}}</div>
                                                </td>
                                                <td>
                                                    <div align="left">乳牙{{tableData.he_lose}}</div>
                                                </td>
                                                <td>
                                                    <div align="left">乳牙{{tableData.he_repair}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">其他记录</div>
                                                </td>
                                                <td colspan="5">
                                                    <div align="left">{{tableData.other_record}}</div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td rowspan="4">
                                                    <div align="left">内科</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">近期不适症状</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.recent_unwell}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">心率</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.heart_rate}}次/分</div>
                                                </td>
                                                <td>
                                                    <div align="left">心脏杂音</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.cardiac_souffle === 1? '无':'有'}}</div>
                                                </td>
                                                <td>
                                                    <div align="left">心律</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.cardiac_rhythm === 1 ? '齐':
                                                        tableData.cardiac_rhythm === 2 ? '不齐':'绝对不齐'}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">肺部罗音</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.lung_rale ===
                                                        1?'无':tableData.lung_rale === 2?'干罗音':'湿罗音'}}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div align="left">肝</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.liver === 1?'正常':'肝大'}}</div>
                                                </td>
                                                <td>
                                                    <div align="left">脾</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.spleen === 1?'正常':'脾大'}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">其他记录</div>
                                                </td>
                                                <td colspan="5">
                                                    <div align="left">{{tableData.remark}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">50m跑</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.run_fiftym}}s</div>
                                                </td>
                                                <td>
                                                    <div align="left">立定跳远</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.standing_jump}}cm</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">握力</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.grip}}kg</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">斜身引体</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.oblique_pullups}}次</div>
                                                </td>
                                                <td>
                                                    <div align="left">引体向上</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.pull_up}}次</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">俯卧背起</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.back_stomach}}次</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">50*8往返跑</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.runback_fiftym}}s</div>
                                                </td>
                                                <td>
                                                    <div align="left">800米跑</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.run_ehm}}s</div>
                                                </td>
                                                <td rowspan="2" colspan="2">
                                                    <div align="left">一分钟仰卧起坐</div>
                                                </td>
                                                <td colspan="2" rowspan="2">
                                                    <div align="left">{{tableData.sit_up}}次</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div align="left">1000米跑</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.run_othm}}s</div>
                                                </td>
                                                <td>
                                                    <div align="left">坐位体前屈</div>
                                                </td>
                                                <td>
                                                    <div align="left">{{tableData.bent_forward}}次</div>
                                                </td>
                                            </tr>

                                            <tr>

                                            </tr>
                                            <tr class="jielun">
                                                <td>
                                                    <div align="left">本次体质监测结论</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">{{tableData.main_inspection}}</div>
                                                </td>
                                            </tr>

                                            <tr class="zhidao">
                                                <td>
                                                    <div align="left">健康指导</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">{{tableData.health_guide}}</div>
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
        name: 'printReportTest',
        // props: ['planCode','year','studentCode', 'title', 'flag'],
        props: ['student_id', 'title', 'flag'],
        data() {
            return {
                show: 1,
                spinShow: true,
                printHtml: "",
                topInfo: {
                    school_name: '',
                    grade: '',
                    class: '',
                    name: '',
                    sex: '',
                    IDcard: '',
                    date: '',
                    anamnesis: '',
                    // history:''
                },
                tableData: {
                    //一般
                    height: '',
                    weight: '',
                    bmi: '',
                    //生理功能
                    sp: '',
                    dp: '',
                    pulse: '',

                    //视力
                    r_eyesight: '',
                    l_eyesight: '',
                    r_bcva: '',
                    l_bcva: '',
                    r_s: '',
                    r_c: '',
                    r_a: '',
                    l_s: '',
                    l_c: '',
                    l_a: '',
                    pd: '',
                    r_positivelens: '',
                    r_negativefilm: '',
                    l_positivelens: '',
                    l_negativefilm: '',
                    // l_dioptric:'',

                    //口腔科
                    dentition: '',
                    periodontal: '',
                    decayed_tooth: '',
                    he_broken: '',
                    he_lose: '',
                    he_repair: '',

                    //内科
                    recent_unwell: '',
                    heart_rate: '',
                    cardiac_souffle: '',
                    cardiac_rhythm: '',
                    lung_rale: '',
                    liver: '',
                    spleen: '',

                    bent_forward: '',
                    run_othm: '',
                    run_ehm: '',
                    pull_up: '',
                    oblique_pullups: '',
                    standing_jump: '',
                    back_stomach: '',
                    runback_fiftym: '',
                    grip: '',
                    sit_up: '',
                    run_fiftym: '',
                    vital_capacity: '',
                    chest: '',
                    main_inspection: '',
                    health_guide: '',
                    create_time: '',
                    other_record: '',
                    remark: '',

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
                            transform:rotate(0deg);
                            -ms-transform:rotate(0deg); /* IE 9 */
                            -webkit-transform:rotate(0deg); /* Safari and Chrome */
                        }
                        .myPrintTable .baseInfo {
                                margin-bottom: 10px;
                                font-size:14px;
                        }
                        .baseInfo .item{
                            height: 30px;
                            margin-top: 6px;
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
                            bottom: 40px;
                            right: 20px;
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
            //报表打印
            getReportPrint() {
                this.$ajax({
                    url: urls.monitorReport_info,
                    data: {
                        id: this.student_id,
                    }

                }).then(data => {

                    if (data.code === 200) {
                        // this.spinShow = false;
                        let res = data.data;
                        // 基本信息
                        this.topInfo.school_name = res.school_name;
                        this.topInfo.grade = res.grade_name;
                        this.topInfo.class = res.class_name;
                        this.topInfo.name = res.student_name;
                        this.topInfo.sex = res.gender == 1 ? '男' : '女';
                        this.topInfo.IDcard = res.card_num;
                        this.topInfo.date = res.create_time;
                        this.topInfo.anamnesis = res.anamnesis == null ? '无' : res.anamnesis;

                        // 表格信息
                        // 形体
                        this.tableData.height = res.height;
                        this.tableData.weight = res.weight;
                        this.tableData.bmi = res.bmi;

                        //生理功能
                        this.tableData.ssy = res.sp;
                        this.tableData.szy = res.dp;
                        this.tableData.mb = res.pulse;

                        //视力
                        this.tableData.l_eyesight = res.l_eyesight && res.l_eyesight.toFixed(1);
                        this.tableData.r_eyesight = res.r_eyesight && res.r_eyesight.toFixed(1);
                        this.tableData.l_bcva = res.l_bcva && res.l_bcva.toFixed(1);
                        this.tableData.r_bcva = res.r_bcva && res.r_bcva.toFixed(1);
                        this.tableData.qglcyx = res.qglcyx && res.qglcyx.toFixed(1);
                        this.tableData.r_s = res.r_s && res.r_s.toFixed(1);
                        this.tableData.r_c = res.r_c && res.r_c.toFixed(1);
                        this.tableData.r_a = res.r_a && res.r_a.toFixed(1);

                        this.tableData.l_s = res.l_s && res.l_s.toFixed(1);
                        this.tableData.l_c = res.l_c && res.l_c.toFixed(1);
                        this.tableData.l_a = res.l_a && res.l_a.toFixed(1);
                        this.tableData.pd = res.pd && res.pd.toFixed(1);

                        this.tableData.r_positivelens = res.r_positivelens === 1 ? '↑' : res.r_positivelens === 2 ? '↓' : '0';
                        this.tableData.r_negativefilm = res.r_negativefilm === 1 ? '↑' : res.r_negativefilm === 2 ? '↓' : '0';
                        this.tableData.l_positivelens = res.l_positivelens === 1 ? '↑' : res.l_positivelens === 2 ? '↓' : '0';
                        this.tableData.l_negativefilm = res.l_negativefilm === 1 ? '↑' : res.l_negativefilm === 2 ? '↓' : '0';
                        // this.tableData.l_dioptric= res.l_dioptric;

                        //口腔科
                        this.tableData.he_broken = res.he_broken;
                        this.tableData.he_lose = res.he_lose;
                        this.tableData.he_repair = res.he_repair;
                        this.tableData.decayed_tooth = res.decayed_tooth;
                        this.tableData.dentition = res.dentition;
                        this.tableData.periodontal = res.periodontal;
                        //牙周
                        if (this.tableData.periodontal != null) {
                            if (this.tableData.periodontal === 1) {
                                this.tableData.periodontal = '阴性'
                            } else if (this.tableData.periodontal === 2) {
                                this.tableData.periodontal = '牙龈炎'
                            } else if (this.tableData.periodontal === 3) {
                                this.tableData.periodontal = '牙石'
                            } else if (this.tableData.periodontal === 4) {
                                this.tableData.periodontal = '浅牙周袋'
                            } else if (this.tableData.periodontal === 5) {
                                this.tableData.periodontal = '深牙周袋'
                            } else {
                                this.tableData.periodontal = '其他'
                            }
                        }

                        // 内科
                        this.tableData.cardiac_rhythm = res.cardiac_rhythm;
                        this.tableData.lung_rale = res.lung_rale;
                        this.tableData.heart_rate = res.heart_rate;
                        this.tableData.cardiac_souffle = res.cardiac_souffle;
                        this.tableData.recent_unwell = res.recent_unwell;
                        this.tableData.liver = res.liver;
                        this.tableData.spleen = res.spleen;

                        // 项目
                        this.tableData.bent_forward = res.bent_forward;
                        this.tableData.run_othm = res.run_othm;
                        this.tableData.run_ehm = res.run_ehm;
                        this.tableData.pull_up = res.pull_up;
                        this.tableData.oblique_pullups = res.oblique_pullups;
                        this.tableData.standing_jump = res.standing_jump;
                        this.tableData.back_stomach = res.back_stomach;
                        this.tableData.runback_fiftym = res.runback_fiftym;
                        this.tableData.grip = res.grip;
                        this.tableData.sit_up = res.sit_up;
                        this.tableData.run_fiftym = res.run_fiftym;
                        this.tableData.vital_capacity = res.vital_capacity;
                        this.tableData.chest = res.chest;


                        // 结论
                        this.tableData.main_inspection = res.main_inspection;
                        this.tableData.health_guide = res.health_guide;
                        this.tableData.other_record = res.other_record;
                        this.tableData.remark = res.remark;

                    }

                })
            },

            close() {
                this.$emit('modal-close');
            },
        },
        created() {
            this.getReportPrint()
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

            .myPrintTable {
                border: 1px solid #000;
                width: 630px;
                padding: 12px 34px 12px 24px;
                margin-bottom: 10px;

                .jigou {
                    text-align: right !important;
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
                                width: 75px;
                                border-bottom: #333 1px solid;
                                left: 32px;
                                top: 20px;

                            }

                            .school {
                                width: 200px;
                            }

                            .ID, .date {
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
        width: 100%;

        tr td {
            padding: 1px;
            padding-left: 5px;
        }

        .jielun {
            height: 70px;
        }

        .zhidao {
            position: relative;
            height: 93px;

            .sign {
                position: absolute;
                bottom: 56px;
                right: 66px;

                .date {
                    margin-left: 50px;
                }
            }
        }
    }

    .demo-spin-container {
        position: relative;
    }
</style>

