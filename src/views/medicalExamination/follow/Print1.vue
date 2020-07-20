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
                                <div class="myPrintTable" style="page-break-after:always;">
                                    <div align="center">
                                        <h2>苏州市中小学生健康体检表（2019版</h2>
                                        <div class="baseInfo">
                                            <div class="item">
                                                <div style="width: 48%">
                                                    学校：{{topInfo.school}}
                                                    <span class="line school"></span>
                                                </div>
                                                <div style="width:20%">
                                                    年级：{{topInfo.grade}}
                                                    <span class="line grade"></span>
                                                </div>
                                                <div class="classStyle" style="width:14%">
                                                    班级：{{topInfo.class}}
                                                    <span class="line class"></span>
                                                </div>
                                                <div style="width:18%">
                                                    姓名：{{topInfo.name}}
                                                    <span class="line name"></span>
                                                </div>
                                                <!-- <div class="time">
                                                    体检日期：{{topInfo.date && topInfo.date.split(' ')[0]}}
                                                    <span class="line date"></span>
                                                </div> -->
                                            </div>
                                            <div class="item">
                                                <div style="width: 20%">
                                                    性别：{{topInfo.sex}}
                                                    <span class="line sex"></span>
                                                </div>
                                                <div style="width: 20%">
                                                    民族：{{topInfo.nation}}
                                                    <span class="line sex"></span>
                                                </div>
                                                <div style="width: 20%">
                                                    寄宿与否：{{topInfo.is_boarding}}
                                                    <span class="line zhuzu"></span>
                                                </div>
                                                <div style="width: 40%">
                                                    身份证号：{{topInfo.IDcard}}
                                                    <span class="line ID"></span>
                                                </div>
                                            </div>
                                            <div class="item redDoted">
                                                <div style="width: 100%">
                                                    既往病史 ：{{topInfo.history}}
                                                    <span class="line history"></span>
                                                </div>
                                            </div>
                                            <div class="item redDoted">
                                                <div style="width: 100%">
                                                    残疾情况 ：{{topInfo.disability}}
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
                                                    <div align="left">{{tableData.height}}cm</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">体重</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.weight}}kg</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" rowspan="2">
                                                    <div align="left">生理功能</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">收缩压</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.ssy}}mmHg</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">舒张压</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.szy}}mmHg</div>
                                                </td>
                                                <!-- <td colspan="2"><div align="left">脉搏</div></td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.mb}}次/分</div>
                                                </td> -->
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">心率</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{tableData.pulse}}次/分</div>
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
                                                    <div align="left">{{tableData.newophthalmologys.jiem === 0?
                                                        '异常':'正常'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">角膜</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.newophthalmologys.jiaom ===0?
                                                        '异常':'正常'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">晶体</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.newophthalmologys.jt === 0?
                                                        '异常':'正常'}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">瞳孔</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{tableData.newophthalmologys.tk === 0? '异常':'正常'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">眼位</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.newophthalmologys.yw === 0?
                                                        '异常':'正常'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">眼球运动</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{tableData.newophthalmologys.yqyd === 0? '异常':'正常'}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">异常视觉行为</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{tableData.newophthalmologys.ycsjxw}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">临床印象</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">
                                                        {{tableData.newophthalmologys.lcyx}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">戴镜情况</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{tableData.newophthalmologys.dj}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">右眼裸眼视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.r_eyesight}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">左眼裸眼视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.l_eyesight}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">右眼戴镜视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.r_bcva}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">左眼戴镜视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tableData.l_bcva}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">屈光临床印象</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{tableData.newophthalmologys.diolcyx}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="4" colspan="2">
                                                    <div align="left">口腔</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">齿列</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.stomatologys.dentition === 1 ?
                                                        '整齐':'不齐'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">牙周</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.stomatologys.periodontal}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" rowspan="3">
                                                    <div align="left">有无龋齿</div>
                                                </td>
                                                <td colspan="2" rowspan="3">
                                                    <div align="left">{{tableData.stomatologys.decayed_tooth === 1?
                                                        '无':'有'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">龋患</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">乳牙{{tableData.stomatologys.ru_broken}}&nbsp;恒牙{{tableData.stomatologys.he_broken}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">龋失</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">乳牙{{tableData.stomatologys.ru_lose}}&nbsp;恒牙{{tableData.stomatologys.he_lose}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">龋补</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">乳牙{{tableData.stomatologys.ru_repair}}&nbsp;恒牙{{tableData.stomatologys.he_repair}}</div>
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
                                                    <div align="left">{{tableData.surgerys.skin_str}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">淋巴结</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.surgerys.lymph_str}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">头部</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.surgerys.head_str}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">颈部</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.surgerys.neck_str}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">脊柱</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.surgerys.spine_str}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">四肢</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.surgerys.legs_str}}</div>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">胸部</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{tableData.surgerys.throax_str}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="3" colspan="2">
                                                    <div align="left">内科</div>
                                                </td>
                                                <td colspan="2">
                                                    <div class="" align="left">近期不适症状</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">
                                                        {{tableData.internals.recent_unwell}}{{tableData.internals.other_record?`
                                                        其他(${tableData.internals.other_record})`:''}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">心</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.internals.heart_str}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">肺</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.internals.lung_str}}</div>
                                                </td>
                                            </tr>
                                            <tr>

                                                <td colspan="2">
                                                    <div align="left">肝</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.internals.liver_str}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">脾</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.internals.spleen_str}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2" colspan="2">
                                                    <div align="left">检验</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left" class="dotted2">肝功能ALT</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.clinicalLabs.alt }}<span
                                                        class="unit-float">(u/l)</span></div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left" class="dotted2">肝功能TBIL</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.clinicalLabs.tbil}}<span
                                                        class="unit-float">(μmol/l)</span></div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left" class="dotted2">血红蛋白</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.clinicalLabs.hemoglobin }}<span
                                                        class="unit-float">(g/l)</span></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left" class="dotted2">结核菌素试验</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.skinTests.res}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left " class="dotted1">其他化验结果</div>
                                                </td>
                                                <td colspan="8">
                                                    <div align="left">{{tableData.clinicalLabs.other_clinical}}</div>
                                                </td>
                                            </tr>

                                            <tr v-if="this.phy_type === '2'">
                                                <td colspan="2">
                                                    <div align="left">检查</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left" class="dotted2">胸部X线检查</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tableData.inspects.x_ray === 1?'未见异常':'异常'}}
                                                    </div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">结核菌素皮肤试验检查</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tableData.skinTests.res}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">检查</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left" class="dotted2">胸部X线检查</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{tableData.inspects.x_ray === 1?'未见异常':'异常'}}
                                                    </div>
                                                </td>

                                            </tr>
                                            <!-- 结核病筛查 -->
                                            <!-- <tr v-if="this.phy_type === '2'">
                                                <td colspan="2"><div align="left">结核病筛查</div></td>
                                                <td colspan="4"><div align="left">有无卡介苗接种史或卡痕？</div></td>
                                                <td colspan="2"><div align="left">{{tableData.tuberculosiss.confirm === 1
                                                    ?'有':'无'}}</div></td>
                                                <td colspan="2"><div align="left">医生意见</div></td>
                                                <td colspan="4"><div align="left">{{tableData.tuberculosiss.doctor_result === 1?'是肺结核可疑症状者':'是肺结核密切接触者'}}</div></td>
                                            </tr> -->
                                            <!-- <tr>
                                                <td colspan="2"><div align="left">需复查项目</div></td>
                                                <td colspan="12"><div align="left">{{tableData.mainInspects.retest_name}}</div></td>
                                            </tr> -->
                                            <tr class="">
                                                <td colspan="2">
                                                    <div align="left">本次体检结论</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{tableData.mainInspects.main_result}}</div>
                                                </td>
                                            </tr>
                                            <tr class="">
                                                <td colspan="2">
                                                    <div align="left">健康评价</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{tableData.mainInspects.health_assessment}}</div>
                                                </td>
                                            </tr>
                                            <tr class="">
                                                <td colspan="2">
                                                    <div align="left">健康指导</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{tableData.mainInspects.health_guide}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">体检单位</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">{{tableData.hospital_name}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">体检日期</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{topInfo.date && topInfo.date.split(' ')[0]}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">历史追踪</div>
                                                </td>
                                                <td colspan="12">
                                                    <div align="left">{{tableData.content}}</div>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- <div class="jigou">苏州市疾病预防控制中心</div> -->
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
    import urls from '../../../service/Urls';

    export default {
        name: 'Print',
        props: ['student_id', 'title', 'flag'],
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
                tableData: {
                    // 眼科
                    newophthalmologys: {},
                    // 口腔
                    stomatologys: {},
                    // 外科
                    surgerys: {
                        other: ''
                    },
                    // 内科
                    internals: {},
                    // 化验
                    clinicalLabs: {},
                    inspects: {},
                    skinTests: {},
                    dioptrics: {},
                    // 结核病筛查
                    tuberculosiss: {
                        doctor_result: '是肺结核可疑症状者',
                        confirm: '是',
                    },
                    // 结论
                    mainInspects: {}
                },
                // 口腔--牙周
                periodontalCondition: {
                    1: '阴性',
                    2: '牙龈炎',
                    3: '牙石',
                    4: '浅牙周袋',
                    5: '深牙周袋',
                },
                // 皮肤
                skinCondition: {
                    1: '正常',
                    2: '潮红',
                    3: '发白',
                    4: '发绀',
                    5: '黄染',
                    6: '色素沉着',
                    7: '湿疹',
                    8: '糜烂'
                },
                // 淋巴结
                lymphCondition: {
                    1: '未触及',
                    2: '锁骨上',
                    3: '腋窝'
                },
                // 胸部
                throaxCondition: {
                    1: '正常',
                    2: '桶状胸',
                    3: '扁平胸',
                    4: '鸡胸',
                    5: '漏斗胸'
                },
                // 结核菌素
                tuberCondition: {
                    1: '阴性',
                    2: '一般阳性',
                    3: '中度阳性',
                    4: '强阳性'
                },
                // 屈光度检查
                qgCondition: {
                    1: '正常',
                    2: '近视',
                    3: '远视',
                    4: '其他'
                },
                //临床印象
                lcyxCondition: {
                    1: '未见异常',
                    2: '近视',
                    3: '远视',
                    4: '弱势',
                    5: '斜视',
                    6: '散光',
                    7: '沙眼',
                    8: '结膜炎',
                },
                //戴镜情况
                djCondition: {
                    1: '不戴镜',
                    2: '佩戴框架眼镜',
                    3: '佩戴隐形眼镜',
                    4: '配戴角膜塑形镜'
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
                        margin: 30px 0 20px 0;
                         @bottom-left {
                          border-top: 10px solid #666;
                        }
                        @bottom-right {
                          margin: 10pt 0 30pt 0;
                          border-top: 10px solid #666;
                        }
                        } @media print {

                        .myPrintTable {
                            width:700px;
                            font-size: 14px;
                            margin: 0px auto 10px;
                            margin-left:40px;
                        }
                        .myPrintTable .baseInfo {
                                margin-bottom: 10px;
                                font-size:14px;
                        }
                        .baseInfo .item{
                            position: relative;
                            height: 25px;
                            margin-top: 8px;
                        }
                        .redDoted:after {
                        content: '*';
                        position: absolute;
                        top:-4px;
                        left: 56px;

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
                            width: 55px;
                            left: 40px;
                        }
                        .reportTable {
                            width:700px;
                        }
                        .reportTable tr td {
                            width: 44px;
                            padding: 4px 0;
                            padding-left: 4px;
                            position:relative;
                        }
                        .unit-float {
                            position: absolute;
                            right: 10px;
                            top: 50%;
                            transform:translateY(-50%);
                        }
                        .dotted1,dotted2 {
                            position:relative;
                        }
                        .dotted1:after {
                            content: '*';
                            position: absolute;
                            top:0px;
                        }
                        .dotted2:after {
                            content: '**';
                            position: absolute;
                            top:0px;
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
                        student_id: this.student_id,
                        type: 1
                    }

                }).then(data => {
                    if (data.code === 200) {
                        // this.phy_type = data.data.phy_type
                        // if(this.phy_type == 2){
                        //     this.topTitle = '学生健康（升学）检查报告单'
                        // }else {
                        //     this.topTitle = '江苏省中小学生健康体检表(2019版)'
                        // }
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
                        this.topInfo.history = res.anamnesis == null ? '无' : res.anamnesis;
                        this.topInfo.disability = res.disability == null ? '无' : res.disability;
                        this.topInfo.nation = res.nation ? res.nation : '汉';
                        this.tableData.hospital_name = res.hospital_name ? res.hospital_name : '';

                        // 表格信息
                        // 形体
                        if (res.physicalExamRecords.length !== 0) {
                            this.tableData.height = res.physicalExamRecords[0].height;
                            this.tableData.weight = res.physicalExamRecords[0].weight;
                            this.tableData.bmi = res.physicalExamRecords[0].bmi;
                        }
                        //生理功能
                        if (res.physicalFunctions.length !== 0) {
                            this.tableData.ssy = res.physicalFunctions[0].sp;
                            this.tableData.szy = res.physicalFunctions[0].dp;
                            this.tableData.pulse = res.physicalFunctions[0].pulse;
                        }
                        //眼科
                        if (res.eyesights.length !== 0) {
                            //视力
                            this.tableData.l_eyesight = res.eyesights[0].l_eyesight ? res.eyesights[0].l_eyesight.toFixed(1) : '';
                            this.tableData.r_eyesight = res.eyesights[0].r_eyesight ? res.eyesights[0].r_eyesight.toFixed(1) : '';
                            // 矫正视力
                            this.tableData.l_bcva = res.eyesights[0].l_bcva ? res.eyesights[0].l_bcva.toFixed(1) : '';
                            this.tableData.r_bcva = res.eyesights[0].r_bcva ? res.eyesights[0].r_bcva.toFixed(1) : '';
                        }
                        if (res.newophthalmologys.length !== 0) {
                            this.tableData.newophthalmologys = res.newophthalmologys[0];
                            this.tableData.newophthalmologys.dj = this.getDetailCondition(res.newophthalmologys[0].dj, 8);
                        }


                        //口腔科
                        if (res.stomatologys.length !== 0) {
                            this.tableData.stomatologys = res.stomatologys[0];
                            this.tableData.stomatologys.periodontal = this.getDetailCondition(res.stomatologys[0].periodontal, 4);
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
                        // 化验
                        this.tableData.clinicalLabs = res.clinicalLabs.length !== 0 ? res.clinicalLabs[0] : {};
                        this.tableData.inspects = res.inspects.length !== 0 ? res.inspects[0] : {};
                        if (res.skinTests.length !== 0) {
                            this.tableData.skinTests = res.skinTests[0];
                            this.tableData.skinTests.res = this.getDetailCondition(res.skinTests[0].result, 5);
                        }
                        //结核病筛查检查
                        if (res.tuberculosiss && res.tuberculosiss.length > 0) {
                            this.tableData.tuberculosiss = res.tuberculosiss[0];

                            if (res.tuberculosiss[0].confirm != null) {
                                this.tableData.tuberculosiss.confirm = res.tuberculosiss[0].confirm === 1 ? '有' : '无';
                            }
                            if (res.tuberculosiss[0].doctor_result != null) {
                                this.tableData.tuberculosiss.doctor_result = res.tuberculosiss[0].doctor_result === 1 ? '肺结核可疑症状者' : '肺结核密切接触者';
                            }

                        }
                        // 结论
                        this.tableData.mainInspects = res.mainInspects.length !== 0 ? res.mainInspects[0] : {};
                        if (this.tableData.mainInspects.health_assessment != null) {
                            if (this.tableData.mainInspects.health_assessment === 1) {
                                this.tableData.mainInspects.health_assessment = '健康良好';
                            } else if (this.tableData.mainInspects.health_assessment === 2) {
                                this.tableData.mainInspects.health_assessment = '患有疾病';
                            } else if (this.tableData.mainInspects.health_assessment === 3) {
                                this.tableData.mainInspects.health_assessment = '身体残疾';
                            } else {
                                this.tableData.mainInspects.health_assessment = '无';
                            }
                        }
                        this.tableData.content = res.content;
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
                        position: relative;
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

                    .redDoted:after {
                        content: '*';
                        position: absolute;
                        top: -4px;
                        left: 48px;

                    }
                }
            }
        }

    }

    .reportTable {
        width: 616px;

        .dotted1 {
            position: relative;

            &:after {
                content: '*';
                position: absolute;
                top: 0px;
            }
        }

        .dotted2 {
            position: relative;

            &:after {
                content: '**';
                position: absolute;
                top: 0px;
            }
        }

        td {
            width: 44px;
            padding: 2px 2px 2px 5px;
            position: relative;

            .unit-float {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .jielun {
            height: 70px;
        }

        // .zhidao {
        //     position: relative;
        //     height:93px;
        //     .sign{
        //         position: absolute;
        //         bottom: 10px;
        //         right: 20px;
        //         .date {
        //             margin-left: 50px;
        //         }
        //     }
        // }
    }

    .demo-spin-container {
        position: relative;
    }

    .nameunderline {
        position: relative;
        bottom: -6px;
        display: inline-block;
        width: 100px;
        border-bottom: 1px solid #000;
    }
</style>

