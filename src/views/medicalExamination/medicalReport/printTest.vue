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
                         @click="doPrint">
                    <!-- <img src="../../../assets/medicalExamination/print.png" alt="" style="cursor: pointer"
                         @click="printOne"> -->
                </div>
                <div class="img-area demo-spin-container">
                    <template>
                        <!--startprint-->
                        <section ref="print">
                            <div class="qrcode breakable" id="page1" style="height: 100%; position: relative;">
                                <div class="myTjPrintTable ">
                                    <div align="center">
                                        <h2>苏州市中小学生健康体检表（2019版）</h2>
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
                                        <table class="tj_reportTable" border="1" style="border-collapse: collapse;">
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">一般</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">身高</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tjReportData.height}}cm</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">体重</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tjReportData.weight}}kg</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><div align="left">生理功能</div></td>
                                                <td colspan="2"><div align="left">收缩压</div></td>
                                                <td colspan="2">
                                                    <div align="left">{{tjReportData.ssy}}<span class="unit-float">(mmHg)</span></div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">舒张压</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tjReportData.szy}}<span class="unit-float">(mmHg)</span></div>
                                                </td>
                                                <td colspan="2"><div align="left">心率</div></td>
                                                <td colspan="2">
                                                    <div align="left">{{tjReportData.pulse}}<span class="unit-float">(次/分)</span></div>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td rowspan="6" colspan="2"><div align="left">眼科</div></td>

                                                <td colspan="2"><div align="left">结膜</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.newophthalmologys.jiem === 0? '异常':'正常'}}</div></td>
                                                <td colspan="2"><div align="left">角膜</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.newophthalmologys.jiaom ===0? '异常':'正常'}}</div></td>
                                                <td colspan="2"><div align="left">晶体</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.newophthalmologys.jt === 0? '异常':'正常'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">瞳孔</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{tjReportData.newophthalmologys.tk === 0? '异常':'正常'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">眼位</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">{{tjReportData.newophthalmologys.yw === 0?
                                                        '异常':'正常'}}
                                                    </div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">眼球运动</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">
                                                        {{tjReportData.newophthalmologys.yqyd === 0? '异常':'正常'}}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><div align="left">异常视觉行为</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.newophthalmologys.ycsjxw}}{{tjReportData.newophthalmologys.qtycsjxw?`,其他(${tjReportData.newophthalmologys.qtycsjxw})`:''}}
                                                    </div></td>
                                                <td colspan="2"><div align="left">临床印象</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.newophthalmologys.lcyx}}{{tjReportData.newophthalmologys.qtlcyx?`,其他(${tjReportData.newophthalmologys.qtlcyx})`:''}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><div align="left">戴镜情况</div></td>
                                                <td colspan="10"><div align="left">{{tjReportData.newophthalmologys.dj}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">右眼裸眼视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tjReportData.r_eyesight}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">左眼裸眼视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tjReportData.l_eyesight}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">右眼戴镜视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tjReportData.r_bcva}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">左眼戴镜视力 (按5.0计数法)</div>
                                                </td>
                                                <td colspan="1">
                                                    <div align="left">{{tjReportData.l_bcva}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td colspan="2">
                                                    <div align="left">屈光临床印象</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{tjReportData.newophthalmologys.diolcyx}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2" colspan="2"><div align="left">口腔</div></td>
                                                <td colspan="2"><div align="left">齿列</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.stomatologys.dentition === 1 ? '整齐':'不齐'}}</div></td>
                                                <td colspan="2"><div align="left">牙周</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.stomatologys.periodontal === 1?'正常':'异常'}}</div></td>
                                                <td colspan="2"><div align="left">有无龋齿</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.stomatologys.decayed_tooth === 1? '无':'有'}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" ><div align="left">龋患</div></td>
                                                <td colspan="2"><div align="left">乳牙{{tjReportData.stomatologys.ru_broken}}&nbsp;恒牙{{tjReportData.stomatologys.he_broken}}</div></td>
                                                <td colspan="2"><div align="left">龋失</div></td>
                                                <td colspan="2"><div align="left">乳牙{{tjReportData.stomatologys.ru_lose}}&nbsp;恒牙{{tjReportData.stomatologys.he_lose}}</div></td>
                                                <td colspan="2"><div align="left">龋补</div></td>
                                                <td colspan="2"><div align="left">乳牙{{tjReportData.stomatologys.ru_repair}}&nbsp;恒牙{{tjReportData.stomatologys.he_repair}}</div></td>
                                            </tr>
                                            <tr>
                                                <td rowspan="4" colspan="2">
                                                    <div align="left">外科</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">皮肤</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tjReportData.surgerys.skin_str}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">淋巴结</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tjReportData.surgerys.lymph_str}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">头部</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tjReportData.surgerys.head_str}}</div>
                                                </td>
                                                <td colspan="2"><div align="left">颈部</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.surgerys.neck_str}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">脊柱</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tjReportData.surgerys.spine_str}}</div>
                                                </td>
                                                <td colspan="2">
                                                    <div align="left">四肢</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{tjReportData.surgerys.legs_str}}</div>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">胸部</div>
                                                </td>
                                                <td colspan="10">
                                                    <div align="left">{{tjReportData.surgerys.throax_str}}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowspan="3" colspan="2"><div align="left">内科</div></td>
                                                <td colspan="2"><div class="" align="left">近期不适症状</div></td>
                                                <td colspan="10"><div align="left">{{tjReportData.internals.recent_unwell}}{{tjReportData.internals.other_record?` 其他(${tjReportData.internals.other_record})`:''}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><div align="left">心</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.internals.heart_str}}</div></td>
                                                <td colspan="2"><div align="left">肺</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.internals.lung_str}}</div></td>
                                            </tr>
                                            <tr>

                                                <td colspan="2"><div align="left">肝</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.internals.liver_str}}</div></td>
                                                <td colspan="2"><div align="left">脾</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.internals.spleen_str}}</div></td>
                                            </tr>
                                            <tr>
                                                <td rowspan="2" colspan="2"><div align="left">检验</div></td>
                                                <td colspan="2"><div align="left" class="dotted2">肝功能ALT</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.clinicalLabs.alt }}<span class="unit-float">(u/l)</span></div></td>
                                                <td colspan="2"><div align="left" class="dotted2">肝功能TBIL</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.clinicalLabs.tbil}}<span class="unit-float">(μmol/l)</span></div></td>
                                                <td colspan="2"><div align="left" class="dotted2">血红蛋白</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.clinicalLabs.hemoglobin }}<span class="unit-float">(g/l)</span></div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><div align="left" class="dotted2">结核菌素试验</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.skinTests.res}}</div></td>
                                                <td colspan="2"><div align="left " class="dotted1">其他化验结果</div></td>
                                                <td colspan="8"><div align="left">{{tjReportData.clinicalLabs.other_clinical}}</div></td>
                                            </tr>

                                            <tr v-if="this.phy_type === '2'">
                                                <td colspan="2"><div align="left">检查</div></td>
                                                <td colspan="2"><div align="left" class="dotted2">胸部X线检查</div></td>
                                                <td colspan="2"><div align="left">{{tjReportData.inspects.x_ray === 1?'未见异常':(tjReportData.inspects.x_ray === 2 ? '异常' :'')}}</div></td>
                                                <td colspan="4"><div align="left">结核菌素皮肤试验检查</div></td>
                                                <td colspan="4"><div align="left">{{tjReportData.skinTests.res}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2"><div align="left">检查</div></td>
                                                <td colspan="2"><div align="left" class="dotted2">胸部X线检查</div></td>
                                                <td colspan="10"><div align="left">{{tjReportData.inspects.x_ray === 1?'未见异常':(tjReportData.inspects.x_ray === 2 ? '异常' :'')}}</div></td>

                                            </tr>

                                            <tr class="">
                                                <td colspan="2"><div align="left">健康评价</div></td>
                                                <td colspan="12"><div align="left">{{tjReportData.mainInspects.health_assessment}}</div></td>
                                            </tr>
                                            <tr class="tj_jielun">
                                                <td colspan="2"><div align="left">本次体检结论</div></td>
                                                <td colspan="12"><div style="white-space: pre-line;" align="left">{{tjReportData.mainInspects.main_result}}</div></td>
                                            </tr>
                                            <tr class="zhidao">
                                                <td colspan="2"><div align="left">健康指导</div></td>
                                                <td colspan="12"><div style="white-space: pre-line;" align="left">{{tjReportData.mainInspects.health_guide}}</div></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div align="left">体检单位</div>
                                                </td>
                                                <td colspan="6">
                                                    <div align="left">{{tjReportData.hospital_name}}</div>
                                                </td>
                                                 <td colspan="2">
                                                    <div align="left">体检日期</div>
                                                </td>
                                                <td colspan="4">
                                                    <div align="left">{{topInfo.date && topInfo.date.split(' ')[0]}}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="reports_footer">
                                            <div class="beizhu">
                                                <p>1、肝功能ALT**，肝功能TBIL**，血红蛋白**为寄宿制学生必要时检查项目，如检查，结果须上报。</p>
                                                <p>2、结核菌素试验**：高中和寄宿制初中的入学新生及其他学段有肺结核密切接触者必须检查项目，结果必须上报;结果根据症状进行判断。</p>
                                                <p>3、胸部X线检查**：对肺结核可疑症状者和结核菌素试验强阳性者必须检查项目，结果必须上报。</p>
                                            </div>
                                            <div class="sign">家长签名：<span class="line"></span></div>

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
    // import jcpfree from '../../../libs/jcpfree.js';
    import urls from '../../../service/Urls';

    export default {
        name: 'printSummaryReport',
        // props: ['planCode','year','studentCode', 'title', 'flag'],
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
                phy_type: '',
                tjReportData: {
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
                // periodontalCondition: {
                //     1: '阴性',
                //     2: '牙龈炎',
                //     3: '牙石',
                //     4: '浅牙周袋',
                //     5: '深牙周袋',
                // },
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
            doPrint() {
                var myDoc = {
                    documents:document,
			        copyrights : '随便写 ' // 版权声明必须
                };
                console.log(getJCP())
                var jcp = getJCP();
                console.log(jcp)
		        // 调用打印方法
		        // jcp.print(myDoc, false); // 不弹出对话框打印
                jcp.printPreview(myDoc, false)
                console.log('001')
	        },
            printOne() {
                this.printHtmlCustomStyle();
            },
            // 打印样式
            printHtmlCustomStyle() {
                const style =
                    `@page {
                        margin: 20px 0 10px 0;
                         @bottom-left {
                          border-top: 10px solid #666;
                        }
                        @bottom-right {
                          margin: 10pt 0 30pt 0;
                          border-top: 10px solid #666;
                        }
                        } @media print {

                        .myTjPrintTable {
                            width:700px;
                            font-size: 14px;
                            margin: 0px auto 10px;
                            margin-left:40px;
                        }
                        .myTjPrintTable .baseInfo {
                                margin-bottom: 6px;
                                font-size:14px;
                        }
                        .baseInfo .item{
                            position: relative;
                            height: 25px;
                            margin-top: 2px;
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
                        .tj_reportTable {
                            width:700px;
                        }
                        .tj_reportTable tr td {
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
                        .tj_reportTable .zhidao {
                            height:70px;
                        }
                        .tj_reportTable .tj_jielun {
                            height:46px;
                        }
                        .reports_footer {
                            margin-top: 10px;
                            text-align: left;
                            position: relative;
                            display: flex;
                        }
                        .beizhu {
                            color:#222;
                            flex: 1;
                            text-align: left;
                            margin-right: 170px;
                        }
                        .beizhu p {
                            margin: 0;
                            padding: 0;
                        }
                        .myTjPrintTable .sign {
                            position: absolute;
                            top: 20px;
                            right:100px;
                        }
                        .sign .line {
                            position: absolute;
                            width: 100px;
                            height: 1px;
                            border-bottom:1px solid #000;
                            right:-100px;
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
                        student_id: this.student_id[0],
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
                        console.log(res)
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
                        this.tjReportData.hospital_name = res.hospital_name ? res.hospital_name : '';

                        // 表格信息
                        // 形体
                        if (res.physicalExamRecords.length !== 0) {
                            this.tjReportData.height = res.physicalExamRecords[0].height;
                            this.tjReportData.weight = res.physicalExamRecords[0].weight;
                            this.tjReportData.bmi = res.physicalExamRecords[0].bmi;
                        }
                        //生理功能
                        if (res.physicalFunctions.length !== 0) {
                            this.tjReportData.ssy = res.physicalFunctions[0].sp;
                            this.tjReportData.szy = res.physicalFunctions[0].dp;
                            this.tjReportData.pulse = res.physicalFunctions[0].pulse;
                        }
                        //眼科
                        if (res.eyesights.length !== 0) {
                            //视力
                            this.tjReportData.l_eyesight = res.eyesights[0].l_eyesight.toFixed(1);
                            this.tjReportData.r_eyesight = res.eyesights[0].r_eyesight.toFixed(1);
                            // 矫正视力
                            this.tjReportData.l_bcva = res.eyesights[0].l_bcva.toFixed(1);
                            this.tjReportData.r_bcva = res.eyesights[0].r_bcva.toFixed(1);
                        }
                        if (res.newophthalmologys.length !== 0) {
                            this.tjReportData.newophthalmologys = res.newophthalmologys[0];

                            this.tjReportData.newophthalmologys.dj = this.getDetailCondition(res.newophthalmologys[0].dj, 8);

                        }


                        //口腔科
                        if (res.stomatologys.length !== 0) {
                            this.tjReportData.stomatologys = res.stomatologys[0];
                        }
                        // 外科
                        if (res.surgerys.length !== 0) {
                            this.tjReportData.surgerys = res.surgerys[0];
                            this.tjReportData.surgerys.skin_str = res.surgerys[0].skin_str;
                            this.tjReportData.surgerys.lymph_str = res.surgerys[0].lymph_str;
                            this.tjReportData.surgerys.throax_str = res.surgerys[0].throax_str;
                        }
                        // 内科
                        this.tjReportData.internals = res.internals.length !== 0 ? res.internals[0] : {};
                        // 化验
                        this.tjReportData.clinicalLabs = res.clinicalLabs.length !== 0 ? res.clinicalLabs[0] : {};
                        this.tjReportData.inspects = res.inspects.length !== 0 ? res.inspects[0] : {};
                        if (res.skinTests.length !== 0) {
                            this.tjReportData.skinTests = res.skinTests[0];
                            this.tjReportData.skinTests.res = this.getDetailCondition(res.skinTests[0].result, 5);
                        }
                        //结核病筛查检查
                        if (res.tuberculosiss && res.tuberculosiss.length > 0) {
                            this.tjReportData.tuberculosiss = res.tuberculosiss[0];

                            if (res.tuberculosiss[0].confirm != null) {
                                this.tjReportData.tuberculosiss.confirm = res.tuberculosiss[0].confirm === 1 ? '有' : '无';
                            }
                            if (res.tuberculosiss[0].doctor_result != null) {
                                this.tjReportData.tuberculosiss.doctor_result = res.tuberculosiss[0].doctor_result === 1 ? '肺结核可疑症状者' : '肺结核密切接触者';
                            }

                        }
                        // 结论
                        this.tjReportData.mainInspects = res.mainInspects.length !== 0 ? res.mainInspects[0] : {};
                        // tjReportData.mainInspects.main_result
                        if(this.tjReportData.mainInspects.main_result != null) {
                            this.tjReportData.mainInspects.main_result = this.tjReportData.mainInspects.main_result.trim().replace(/<br>/g,'\n')
                        }
                        if (this.tjReportData.mainInspects.health_assessment != null) {
                                if (this.tjReportData.mainInspects.health_assessment === 1) {
                                    this.tjReportData.mainInspects.health_assessment = '健康良好';
                                } else if (this.tjReportData.mainInspects.health_assessment === 2) {
                                    this.tjReportData.mainInspects.health_assessment = '患有疾病';
                                } else if (this.tjReportData.mainInspects.health_assessment === 3) {
                                    this.tjReportData.mainInspects.health_assessment = '身体残疾';
                                }else {
                                    this.tjReportData.mainInspects.health_assessment = '无';
                                }
                            }

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

            .myTjPrintTable {
                border: 1px solid #000;
                width: 638px;
                padding: 12px 10px 12px 10px;
                .reports_footer {
                    margin-top: 10px;
                    text-align: left;
                    position: relative;
                    display: flex;
                    .sign {
                        position: absolute;
                        top: 30px;
                        right:100px;
                        .line {
                            position: absolute;
                            width: 100px;
                            height: 1px;
                            background:#000;
                            right:-100px;
                            top: 15px;
                        }
                    }
                    .beizhu {
                        flex: 1;
                        text-align: left;
                        margin-right: 170px;
                    }

                }

                .baseInfo {
                    margin-bottom: 2px;
                    margin-top: 4px;
                    font-size: 12px;
                    .item {
                        position: relative;
                        // margin-top: 4px;
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
                        top:-4px;
                        left: 48px;

                    }
                }
            }
        }

    }

    .tj_reportTable {
        width: 630px;
        .dotted1 {
                position: relative;
                &:after {
                    content: '*';
                    position: absolute;
                    top:0px;
                }
            }
        .dotted2 {
                position: relative;
                &:after {
                    content: '**';
                    position: absolute;
                    top:0px;
                }
            }

        td {
            width: 44px;
            padding: 1px 2px 1px 5px;
            position: relative;
            .unit-float {
                position: absolute;
                right: 10px;
                top: 50%;
                transform:translateY(-50%);
            }
        }
        .tj_jielun {
                height:36px;
            }
        .zhidao {
                height:60px;
        }
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

