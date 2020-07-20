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
                            <div class="qrcode" id="imhg" style="height: 100%">
                                <div class="myPrintTable" style="page-break-after:always;">
                                    <div align="center">
                                        <h2>江苏省中小学生健康体检表(2019苏州版)</h2>
                                        <div class="baseInfo">
                                            <div class="item">
                                                <div style="width: 48%">
                                                    学校：{{obj.school}}
                                                    <span class="line school"></span>
                                                </div>
                                                <div style="width:20%">
                                                    年级：{{obj.grade}}
                                                    <span class="line grade"></span>
                                                </div>
                                                <div class="classStyle" style="width:14%">
                                                    班级：{{obj.class}}
                                                    <span class="line class"></span>
                                                </div>
                                                <div style="width:18%">
                                                    姓名：{{obj.name}}
                                                    <span class="line name"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width: 20%">
                                                    性别：{{obj.gender}}
                                                    <span class="line sex"></span>
                                                </div>
                                                <div style="width: 20%">
                                                    民族：{{obj.nation}}
                                                    <span class="line sex"></span>
                                                </div>
                                                <div style="width: 20%">
                                                    寄宿与否：{{obj.is_boarding}}
                                                    <span class="line zhuzu"></span>
                                                </div>
                                                <div style="width: 40%">
                                                    身份证号：{{obj.card_num}}
                                                    <span class="line ID"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width: 100%">
                                                    既往病史：{{obj.anamnesis}}
                                                    <span class="line history"></span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div style="width: 100%">
                                                    残疾情况：{{obj.disability}}
                                                    <span class="line history"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="reportTable" border="1" style="border-collapse: collapse;">
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">一般</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">身高</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.height}}cm</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">体重</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.weight}}kg</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" rowspan="1">
                                                    <div align="left">生理功能</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">收缩压</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{obj.sp}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">舒张压</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{obj.dp}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">心率</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{obj.pulse}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="6" colspan="2">
                                                    <div align="left">眼科</div>
                                                </td>

                                                <td colspan="2">
                                                    <div align="left">结膜</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.jiem}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">角膜</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.jiaom}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">晶体</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.jt}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">瞳孔</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.tk}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">眼位</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.yw}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">眼球运动</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.yqyd}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">异常视觉行为</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.ycsjxw}}
                                                    </div>
                                                </td>
                                                <td colspan="2" rowspan="1">
                                                    <div align="left">临床印象</div>
                                                </td>
                                                <td colspan="6" rowspan="1">
                                                    <div align="left">{{obj.lcyx}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">戴镜情况</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{obj.dj}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">右眼裸眼视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{obj.r_eyesight}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">左眼裸眼视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{obj.l_eyesight}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">右眼戴镜视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{obj.r_bcva}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">左眼戴镜视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{obj.l_bcva}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" rowspan="1">
                                                    <div align="left">屈光临床印象</div>
                                                </td>
                                                <td colspan="10" rowspan="1">
                                                    <div align="left">{{obj.lcyx}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2" colspan="2">
                                                    <div align="left">口腔</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">齿列</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.dentition}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">牙周</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{obj.periodontal}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">有无龋齿</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{obj.decayed_tooth}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">龋患</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{obj.ru_broken}}&nbsp;{{obj.he_broken}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">龋失</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{obj.ru_lose}}&nbsp;{{obj.he_lose}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">龋补</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{obj.ru_repair}}&nbsp;{{obj.he_repair}}</div>
                                                </td>
                                            </tr>
                                            <tr>

                                                <td rowspan="4" colspan="2">
                                                    <div align="left">外科</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">皮肤</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.skin}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">淋巴结</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.lymph}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">头部</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.head}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">颈部</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.neck}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">脊柱</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.spine}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">四肢</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.legs}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">胸部</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{obj.throax}}</div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td rowspan="3" colspan="2">
                                                    <div align="left">内科</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">近期不适症状</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{obj.recent_unwell}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">心</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{obj.heart}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">肺</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.lung}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">肝</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.liver}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">脾</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{obj.spleen}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" rowspan="2">
                                                    <div align="left">检验</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        肝功能ALT**
                                                    </div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{obj.alt}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        肝功能TBIL**
                                                    </div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{obj.tbil}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">
                                                        结核菌素试验**
                                                    </div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{obj.alt}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        其他化验结果 **
                                                    </div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{obj.other_clinical}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">检查</div>
                                                </td>
                                               <td colspan="2">
                                                   胸部Ｘ线检查**
                                               </td>
                                                <td colspan="10">
                                                    <div align="left">{{obj.x_ray}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">健康评价</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{obj.health_assessment}}</div>
                                                </td>
                                            </tr>
                                            <tr class="jielun">
                                                <td colspan="2">
                                                    <div align="left">本次体验结论</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{obj.main_result}}</div>
                                                </td>
                                            </tr>
                                            <tr class="jielun">
                                                <td colspan="2">
                                                    <div align="left">健康指导</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{obj.health_guide}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">体检单位</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">{{obj.hospital_name}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">体检日期</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{obj.create_time}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">历史追踪</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{obj.content}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="text-align: left">
                                            1、肝功能ALT**、肝功能TBIL**、血红蛋白**为寄宿制学生必要时检查项目，如检查，结果须上报。
                                        </p>
                                        <p style="text-align: left">
                                            2、结核菌素试验**：高中和寄宿制初中的入学新生及其他学段有肺结核密切接触者必须检查项目，
                                            结果必须上报；结果根据症状进行判断。
                                        </p>
                                        <p style="text-align: left">
                                            3、胸部X线检查**：对肺结核可疑症状者和结核菌素试验强阳性者必须检查项目，结果必须上报。
                                        </p>
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
    import urls from '@/service/Urls';

    export default {
        name: 'Print',
        props: ['student_id', 'title', 'flag', 'status'],
        data() {
            return {
                show: 1,
                spinShow: true,
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
                topTitle: '江苏省中小学生健康体检表(2019版)',
                phy_type: '',
                obj: {},
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
                            width:700px;
                            font-size: 14px;
                            margin: 30px auto 10px;
                            margin-left:40px;
                        }
                        .myPrintTable .baseInfo {
                                margin-bottom: 10px;
                                font-size:14px;
                        }
                        .baseInfo .item{
                            height: 25px;
                            margin-top: 8px;
                        }
                        .baseInfo .item>div{
                            float:left;
                            position:relative;
                            text-align: left;
                        }

                        .item>div .line {
                            position: absolute;
                            height: 1px;
                            border-bottom: 1px solid #000;
                            top: 20px;

                        }
                        .baseInfo .school {
                            width: 280px;
                            left: 40px;
                        }
                        .classStyle {
                            margin-left:0px;
                        }
                        .baseInfo .ID{
                            width: 212px;
                            left: 66px;
                        }
                        .baseInfo .zhuzu {
                            width: 60px;
                            left: 64px;
                        }
                        .baseInfo .sex {
                            width: 80px;
                            left:40px;
                        }
                        .baseInfo .history {
                            width: 632px;
                            left: 66px;
                        }
                        .baseInfo  .name {
                            width: 86px;
                            left: 40px;
                        }
                        .baseInfo .grade {
                            width: 90px;
                            left: 40px;
                        }
                        .baseInfo .class {
                            width: 70px;
                            left: 40px;
                        }
                        .reportTable {
                            width:700px;
                        }
                        .reportTable tr td {
                            width: 44px;
                            padding: 5px 0;
                            padding-left: 6px;
                        }
                        .reportTable .jielun {
                            height:80px;
                        }
                        // .reportTable .zhidao {
                        //     height:90px;
                        //     position:relative;
                        // }
                        // .sign{
                        //     position: absolute;
                        //     bottom: 10px;
                        //     right: 20px;
                        // }
                        // .sign .date {
                        //         margin-left: 50px;
                        // }
                        .myPrintTable .jigou {
                            text-align: right!important;
                            margin-top: 20px;
                            position:relative;
                            margin-right:120px;
                        }
                        .jigou .line {
                        position: absolute;
                        width: 110px;
                        height: 1px;
                        border-bottom:1px solid #000;
                        right:-110px;
                        top: 20px;
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
            getPrintData() {
                this.$ajax({
                    url: urls.follow_info,
                    data: {
                        student_id: this.student_id,
                        type: 1,
                        status: this.status
                    }
                }).then(data => {
                    this.spinShow = false;
                    if (data.code === 200) {

                        let _data = data.data;
                        this.obj.school = _data.dep_id;
                        this.obj.grade = _data.grade_name;
                        this.obj.class = _data.class_name;
                        this.obj.name = _data.student_name;
                        this.obj.gender = _data.gender === 1 ? '男' : '女';
                        this.obj.is_boarding = _data.is_boarding === 1 ? '是' : '否';
                        this.obj.nation = _data.nation ? _data.nation : '汉';
                        this.obj.card_num = _data.card_num;
                        // this.obj.other_symptoms = _data.other_symptoms;
                        // this.obj.main_symptoms = _data.main_symptoms;
                        this.obj.phy_type = _data.phy_type;
                        this.obj.desk_mat = _data.desk_mat;
                        this.title1 = this.obj.phy_type == '2' ? '学生升学检查报告详情' : '学生健康体检报告详情';
                        // this.$emit('update:title', newobj)

                        //既往病史
                        this.obj.anamnesis = _data.anamnesis ? _data.anamnesis : '无';
                        this.obj.create_time = _data.create_time;
                        this.obj.disability = _data.disability ? _data.disability : '无';

                        //基础信息

                        // this.obj.past_medical = _data.past_medical === 1 ? '有' : '无';
                        // this.obj.friend_have = _data.friend_have === 1 ? '有' : '无';
                        // this.obj.have_touch = _data.have_touch === 1 ? '有' : '无';


                        //形体
                        this.obj.height = _data.height ? _data.height + ' cm' : '';
                        this.obj.weight = _data.weight ? _data.weight + ' kg' : '';
                        this.obj.bmi = _data.bmi;

                        //生理功能
                        this.obj.sp = _data.sp ? _data.sp + ' mmHg' : '';
                        this.obj.dp = _data.dp ? _data.dp + ' mmHg' : '';
                        this.obj.pulse = _data.pulse ? _data.pulse + ' 次/分钟' : '';

                        //外科
                        if (_data.skin) {
                            switch (_data.skin) {
                                case 1:
                                    this.obj.skin = '正常';
                                    break;
                                case 2:
                                    this.obj.skin = '潮红';
                                    break;
                                case 3:
                                    this.obj.skin = '苍白';
                                    break;
                                case 4:
                                    this.obj.skin = '发绀';
                                    break;
                                case 5:
                                    this.obj.skin = '黄染';
                                    break;
                                case 6:
                                    this.obj.skin = '色素沉着';
                                    break;
                                case 7:
                                    this.obj.skin = '湿疹';
                                    break;
                                case 8:
                                    this.obj.skin = '糜烂';
                                    break;
                                case 9:
                                    this.obj.skin = _data.skin_str;
                                    break;
                                default:
                                    this.obj.skin = '';
                            }
                        } else {
                            this.obj.skin = '';
                        }
                        if (_data.lymph) {
                            switch (_data.lymph) {
                                case 1:
                                    this.obj.lymph = '未触及';
                                    break;
                                case 2:
                                    this.obj.lymph = '锁骨上';
                                    break;
                                case 3:
                                    this.obj.lymph = '腋窝';
                                    break;
                                case 4:
                                    this.obj.lymph = _data.lymph_str;
                                    break;
                                default:
                                    this.obj.lymph = '';
                            }
                        } else {
                            this.obj.lymph = '';
                        }

                        if (_data.head) {
                            switch (_data.head) {
                                case 1:
                                    this.obj.head = '正常';
                                    break;
                                case 2:
                                    this.obj.head = '耳郭畸形';
                                    break;
                                case 3:
                                    this.obj.head = '头部外伤';
                                    break;
                                case 4:
                                    this.obj.head = _data.head_str;
                                    break;
                                default:
                                    this.obj.head = '';
                            }
                        } else {
                            this.obj.head = '';
                        }

                        if (_data.neck) {
                            switch (_data.neck) {
                                case 1:
                                    this.obj.neck = '正常';
                                    break;
                                case 2:
                                    this.obj.neck = '甲状腺肿大';
                                    break;
                                case 3:
                                    this.obj.neck = '颈部外伤';
                                    break;
                                case 4:
                                    this.obj.neck = _data.neck_str;
                                    break;
                                default:
                                    this.obj.neck = '';
                            }
                        } else {
                            this.obj.neck = '';
                        }

                        if (_data.spine) {
                            switch (_data.spine) {
                                case 1:
                                    this.obj.spine = '正常';
                                    break;
                                case 2:
                                    this.obj.spine = '脊柱侧弯';
                                    break;
                                case 3:
                                    this.obj.spine = '脊柱矫正中';
                                    break;
                                case 4:
                                    this.obj.spine = '脊柱术后';
                                    break;
                                case 5:
                                    this.obj.spine = '脊柱呈S形';
                                    break;
                                case 6:
                                    this.obj.spine = '脊柱后凸';
                                    break;
                                case 7:
                                    this.obj.spine = _data.spine_str;
                                    break;
                                default:
                                    this.obj.spine = '';
                            }
                        } else {
                            this.obj.spine = '';
                        }
                        if (_data.legs) {
                            switch (_data.legs) {
                                case 1:
                                    this.obj.legs = '正常';
                                    break;
                                case 2:
                                    this.obj.legs = '骨折';
                                    break;
                                case 3:
                                    this.obj.legs = '先天畸形';
                                    break;
                                case 4:
                                    this.obj.legs = '扁平足';
                                    break;
                                case 5:
                                    this.obj.legs = '跛行';
                                    break;
                                case 6:
                                    this.obj.legs = _data.legs_str;
                                    break;
                                default:
                                    this.obj.legs = '';
                            }
                        } else {
                            this.obj.legs = '';
                        }
                        if (_data.throax) {
                            switch (_data.throax) {
                                case 1:
                                    this.obj.throax = '正常';
                                    break;
                                case 2:
                                    this.obj.throax = '桶装胸';
                                    break;
                                case 3:
                                    this.obj.throax = '扁平胸';
                                    break;
                                case 4:
                                    this.obj.throax = '鸡胸';
                                    break;
                                case 5:
                                    this.obj.throax = '漏斗胸';
                                    break;
                                case 6:
                                    this.obj.throax = _data.throax_str;
                                    break;
                                default:
                                    this.obj.throax = '';
                            }
                        } else {
                            this.obj.throax = '';
                        }

                        this.obj.other = _data.other ? _data.other : '无';

                        //结核病筛查检查
                        if (_data.confirm) {
                            switch (_data.confirm) {
                                case 1:
                                    this.obj.confirm = '无';
                                    break;
                                case 2:
                                    this.obj.confirm = '有';
                                    break;
                                default:
                                    this.obj.confirm = '';
                            }
                        } else {
                            this.obj.confirm = '';
                        }
                        if (_data.doctor_result) {
                            switch (_data.doctor_result) {
                                case 1:
                                    this.obj.doctor_result = '肺结核可疑症状者';
                                    break;
                                case 2:
                                    this.obj.doctor_result = '肺结核密切接触者';
                                    break;
                                case 3:
                                    this.obj.doctor_result = '不是肺结核可疑症状者';
                                    break;
                                case 4:
                                    this.obj.doctor_result = '不是肺结核密切接触者';
                                    break;
                                default:
                                    this.obj.doctor_result = '';
                            }
                        } else {
                            this.obj.doctor_result = '';
                        }

                        //检验科
                        this.obj.alt = _data.alt ? _data.alt + ' (U/L)' : '';
                        this.obj.tbil = _data.tbil ? _data.tbil + ' (g/L)' : '';
                        this.obj.hemoglobin = _data.hemoglobin ? _data.hemoglobin + ' (umol/L)' : '';
                        this.obj.other_clinical = _data.other_clinical ? _data.other_clinical : '无';

                        //皮肤测试检查
                        if (_data.result) {
                            switch (_data.result) {
                                case 1:
                                    this.obj.result = '阳性';
                                    break;
                                case 2:
                                    this.obj.result = '一般阳性';
                                    break;
                                case 3:
                                    this.obj.result = '中度阳性';
                                    break;
                                case 4:
                                    this.obj.result = '强阳性';
                                    break;
                                default:
                                    this.obj.result = '';
                            }
                        } else {
                            this.obj.result = '';
                        }

                        //眼科
                        //结膜
                        let obj1 = {
                            1: '正常',
                            2: '异常'
                        };
                        this.obj.jiem = obj1[_data.jiem];
                        this.obj.jiaom = obj1[_data.jiaom];
                        this.obj.jt = obj1[_data.jt];
                        this.obj.tk = obj1[_data.tk];
                        this.obj.yw = obj1[_data.yw];
                        this.obj.yqyd = obj1[_data.yqyd];
                        this.obj.ycsjxw = _data.ycsjxw;

                        if (_data.qtycsjxw) {
                            this.obj.ycsjxw = this.obj.ycsjxw + ' 其他(' + _data.qtycsjxw + ')';
                        }
                        this.obj.lcyx = _data.lcyx;
                        if (_data.qtlcyx) {
                            this.obj.lcyx = this.obj.lcyx + ' 其他(' + _data.qtlcyx + ')';
                        }


                        // this.obj.diolcyx = _data.diolcyx;
                        if (_data.diolcyx) {
                            switch (_data.diolcyx) {
                                case 1:
                                    this.obj.diolcyx = '未见异常';
                                    break;
                                case 2:
                                    this.obj.diolcyx = '近视';
                                    break;
                                case 3:
                                    this.obj.diolcyx = '远视';
                                    break;
                                case 4:
                                    this.obj.diolcyx = '弱视';
                                    break;
                                case 4:
                                    this.obj.diolcyx = '散光';
                                    break;
                                default:
                                    this.obj.diolcyx = '其他';
                                    break;
                            }
                        } else {
                            this.obj.diolcyx = '';
                        }

                        if (_data.dj) {
                            switch (_data.dj) {
                                case 1:
                                    this.obj.dj = '不戴镜';
                                    break;
                                case 2:
                                    this.obj.dj = '佩戴框架眼镜';
                                    break;
                                case 3:
                                    this.obj.dj = '佩戴隐性眼镜';
                                    break;
                                case 4:
                                    this.obj.dj = '佩戴角膜塑形镜';
                                    break;
                                default:
                                    this.obj.dj = '';
                                    break;
                            }
                        } else {
                            this.obj.dj = '';
                        }

                        this.obj.dj_r = _data.dj_r ? `${_data.dj_r}D *` : '';
                        this.obj.dj_l = _data.dj_l ? `${_data.dj_l}D *` : '';

                        this.obj.r_a = _data.r_a ? `${_data.r_a}°` : '';
                        this.obj.l_a = _data.l_a ? `${_data.l_a}°` : '';
                        this.obj.r_s = _data.r_s ? `${_data.r_s}D` : '';
                        this.obj.l_s = _data.l_s ? `${_data.l_s}D` : '';
                        this.obj.r_c = _data.r_c ? `${_data.r_c}D` : '';
                        this.obj.l_c = _data.l_c ? `${_data.l_c}D` : '';

                        this.obj.jmqlbj = _data.jmqlbj ? `${_data.jmqlbj}mm` : '';
                        this.obj.yzcd = _data.yzcd ? `${_data.yzcd}mm` : '';
                        this.obj.sj = obj1[_data.sj];
                        this.obj.sf = _data.sf;
                        this.obj.zz = _data.zz;

                        //视力
                        this.obj.r_eyesight = _data.r_eyesight ? _data.r_eyesight.toFixed(1) : '';
                        this.obj.l_eyesight = _data.l_eyesight ? _data.l_eyesight.toFixed(1) : '';
                        this.obj.r_bcva = _data.r_bcva ? _data.r_bcva.toFixed(1) : '';
                        this.obj.l_bcva = _data.l_bcva ? _data.l_bcva.toFixed(1) : '';

                        //口腔科
                        if (_data.dentition != null) {
                            this.obj.dentition = _data.dentition === 1 ? '整齐' : '不齐';
                        }
                        //牙周
                        this.obj.periodontal = obj1[_data.periodontal];

                        if (_data.decayed_tooth != null) {
                            this.obj.decayed_tooth = _data.decayed_tooth === 1 ? '无' : '有';
                        }
                        this.obj.he_broken = _data.he_broken || _data.he_broken === 0 ? `恒牙${_data.he_broken}` : '';
                        this.obj.he_lose = _data.he_lose || _data.he_lose === 0 ? `恒牙${_data.he_lose}` : '';
                        this.obj.he_repair = _data.he_repair || _data.he_repair === 0 ? `恒牙${_data.he_repair}` : '';
                        this.obj.ru_broken = _data.ru_broken || _data.ru_broken === 0 ? `乳牙${_data.ru_broken}` : '';
                        this.obj.ru_lose = _data.ru_lose || _data.ru_lose === 0 ? `乳牙${_data.ru_lose}` : '';
                        this.obj.ru_repair = _data.ru_repair || _data.ru_repair === 0 ? `乳牙${_data.ru_repair}` : '';


                        this.obj.remark = _data.remark ? _data.remark : '无';


                        //内科
                        this.obj.recent_unwell = _data.recent_unwell ? _data.recent_unwell : '无';
                        this.obj.other_unwell = _data.other_unwell ? _data.other_unwell : '无';
                        if (_data.heart) {
                            switch (_data.heart) {
                                case 1:
                                    this.obj.heart = '正常';
                                    break;
                                case 2:
                                    this.obj.heart = '心脏杂音';
                                    break;
                                case 3:
                                    this.obj.heart = '心律不齐';
                                    break;
                                case 4:
                                    this.obj.heart = _data.heart_str;
                                    break;
                                default:
                                    this.obj.heart = '';
                            }
                        } else {
                            this.obj.heart = '';
                        }

                        // this.obj.cardiac_rhythm = _data.cardiac_rhythm;

                        if (_data.lung) {
                            switch (_data.lung) {
                                case 1:
                                    this.obj.lung = '正常';
                                    break;
                                case 2:
                                    this.obj.lung = '哮鸣声';
                                    break;
                                case 3:
                                    this.obj.lung = '干啰音';
                                    break;
                                case 4:
                                    this.obj.lung = '湿啰音';
                                    break;
                                case 5:
                                    this.obj.lung = _data.lung_str;
                                    break;
                                default:
                                    this.obj.lung = '';
                            }
                        } else {
                            this.obj.lung = '';
                        }

                        //肝
                        if (_data.liver) {
                            switch (_data.liver) {
                                case 1:
                                    this.obj.liver = '正常';
                                    break;
                                case 2:
                                    this.obj.liver = '肝肿大';
                                    break;
                                case 3:
                                    this.obj.liver = '肝区压痛';
                                    break;
                                case 4:
                                    this.obj.liver = _data.liver_str;
                                    break;
                                default:
                                    this.obj.liver = '';
                            }
                        } else {
                            this.obj.liver = '';
                        }

                        //脾
                        if (_data.spleen) {
                            switch (_data.spleen) {
                                case 1:
                                    this.obj.spleen = '正常';
                                    break;
                                case 2:
                                    this.obj.spleen = '脾肿大';
                                    break;
                                case 3:
                                    this.obj.spleen = '脾区压痛';
                                    break;
                                case 4:
                                    this.obj.spleen = _data.spleen_str;
                                    break;
                                default:
                                    this.obj.spleen = '';
                            }
                        } else {
                            this.obj.spleen = '';
                        }
                        this.obj.other_record = _data.other_record ? _data.other_record : '无';


                        //主检
                        this.obj.main_result = _data.main_result;
                        this.obj.retest_name = _data.retest_name;
                        if (_data.health_assessment) {
                            if (this.obj.health_assessment === 1) {
                                this.obj.health_assessment = '健康良好';
                            } else if (this.obj.health_assessment === 2) {
                                this.obj.health_assessment = '患有疾病';
                            } else if (this.obj.health_assessment === 3) {
                                this.obj.health_assessment = '身体残疾';
                            } else {
                                this.obj.health_assessment = '无';
                            }
                        } else {
                            this.obj.health_assessment = '无';
                        }
                        this.obj.health_guide = _data.health_guide;

                        //胸部X线检查
                        if (_data.x_ray) {
                            switch (_data.x_ray) {
                                case 1:
                                    this.obj.x_ray = '未见异常';
                                    break;
                                case 2:
                                    this.obj.x_ray = '异常,' + _data.description;
                                    break;
                                default:
                                    this.obj.x_ray = '';
                            }
                        } else {
                            this.obj.x_ray = '';
                        }

                        this.obj.content = _data.content;
                    } else {
                        // this.obj = [];
                    }
                });
            },
            close() {
                this.$emit('modal-close');
            },
        },
        created() {
            this.getPrintData();
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

            .myPrintTable {
                border: 1px solid #000;
                width: 638px;
                padding: 12px 10px 12px 10px;

                .jigou {
                    text-align: right !important;
                    margin-top: 10px;
                    margin-right: 102px;
                    position: relative;

                    .line {
                        position: absolute;
                        width: 100px;
                        height: 1px;
                        background: #000;
                        right: -100px;
                        top: 15px;
                    }
                }

                .baseInfo {
                    margin-bottom: 8px;
                    font-size: 12px;

                    .item {
                        margin-top: 4px;
                        height: 25px;

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
                                width: 248px;
                            }

                            .grade {
                                width: 78px;
                            }

                            .class {
                                width: 44px;
                            }

                            .ID {
                                width: 190px;
                                left: 56px;
                            }

                            .date {
                                width: 103px;
                            }

                            .sex {
                                width: 80px;
                            }

                            .zhuzu {
                                width: 61px;
                                left: 55px;
                            }

                            .name {
                                width: 78px;
                            }

                            .history {
                                width: 560px;
                                left: 56px;
                            }
                        }

                    }
                }
            }
        }

    }

    .reportTable {
        width: 616px;

        td {
            width: 44px;
            padding: 2px 2px 2px 5px;
        }

        .jielun {
            height: 70px;
        }
    }

    .demo-spin-container {
        position: relative;
    }
</style>


