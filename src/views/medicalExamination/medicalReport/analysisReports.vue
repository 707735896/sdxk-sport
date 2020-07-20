<template>
    <div class="analysis">
        <Modal
            title="分析页面"
            :value="true"
            :mask-closable="false"
            :width="1100"
            footer-hide
            class="anaysisModal"
            @on-cancel="close"
        >
            <div class="scrollBox">
                <div style="display: flex">
                    <div style="width: 26%;">
                        <img style="width:100%;height:688px" src="../../../assets/medicalExamination/peoson.png"
                             alt="people"/>
                        <div class="report-title">{{analyzeInfo.student_name}}数据报告分析</div>
                    </div>
                    <div class="anayDataInfo"
                         style="margin-left: 26px; margin-right:10px; flex: 1;display: flex;flex-direction: column;">
                        <div class="dblinfo" v-if="analyzeInfo.isYibanShow">
                            <img src="../../../assets/medicalExamination/height.png" class="anayImg"
                                 style="margin-top:10px;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">身高：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.height}}</span>cm
                                    </span>
                                    <span class="normal" style="margin-left: 20px">体重：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.weight}}</span>kg
                                    </span>
                                    <span class="normal" style="margin-left: 20px">BMI：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.bmi}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 20px">课桌椅型号：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.desk_mat}}</span>
                                    </span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.xtadvice || analyzeInfo.xtadvice === '正常'"
                                          class="report-normal">结论：正常</span>
                                    <span v-else
                                          class="report-error">结论：bmi={{analyzeInfo.bmi}},{{analyzeInfo.xtadvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="analyzeInfo.isShengliGNShow">
                            <img src="../../../assets/medicalExamination/blood_pressure.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">收缩压：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.sp}}</span>mmHg
                                    </span>
                                    <span class="normal" style="margin-left: 20px">舒张压：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.dp}}</span>mmHg
                                    </span>
                                    <span class="normal" style="margin-left: 20px">心率：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.pulse}}</span>
                                        次/分
                                    </span>
                                </div>
                                <div style="margin-top:5px">
                                    <span
                                        :class="[!analyzeInfo.spadvice || analyzeInfo.spadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.spadvice?analyzeInfo.spadvice:'正常'}}</span>
                                    <!-- <span v-if="!analyzeInfo.spadvice" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.spadvice}}</span> -->
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="analyzeInfo.isYanKeShow">
                            <img src="../../../assets/medicalExamination/eye.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">结膜：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.jiem===0?'异常':'正常'}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 10px">角膜：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.jiaom===0?'异常':'正常'}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 10px">晶体：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.jt===0?'异常':'正常'}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 10px">瞳孔：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.tk===0?'异常':'正常'}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 10px">眼位：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.yw===0?'异常':'正常'}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 10px">眼球运动：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.yqyd===0?'异常':'正常'}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">异常视觉行为：</span>
                                    <span class="report-value">
                                        <span v-if="!analyzeInfo.ycsjxw||analyzeInfo.ycsjxw =='无,'" class="infoSize">无</span>
                                        <span v-else
                                              class="infoSize">{{analyzeInfo.ycsjxw&&analyzeInfo.ycsjxw.replace(/,/g,' ')}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 20px">临床印象：</span>
                                    <span class="report-value">
                                        <span v-if="!analyzeInfo.lcyx||analyzeInfo.lcyx =='无,'" class="infoSize">无</span>
                                        <span v-else class="infoSize">{{analyzeInfo.lcyx.replace(/,/g,' ')}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">戴镜情况：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.djqk? analyzeInfo.djqk+' *':'--'}}</span>
                                    </span>
                                    <span class="normal eyesCondition">右眼：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.dj_r?`${analyzeInfo.dj_r}D *`:'--'}}</span>
                                    </span>
                                    <span class="normal eyesCondition">左眼：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.dj_l?`${analyzeInfo.dj_l}D *`:'--'}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">屈光临床印象：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.siolcyx?analyzeInfo.siolcyx.replace(/,/g,' '):'正常'}}</span>
                                    </span>
                                    <span class="normal dotted1" style="margin-left: 20px">角膜曲率半径</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">&nbsp;：{{analyzeInfo.jmqlbj?`${analyzeInfo.jmqlbj}MM`:'--'}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal dotted1">眼轴长度</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">&nbsp;：{{analyzeInfo.yzcd ?`${analyzeInfo.yzcd}MM`:'--'}}</span>
                                    </span>
                                    <span class="normal eyesCondition dotted1">色觉</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;：{{analyzeInfo.sj === 0?'异常':'正常'}}</span>
                                    </span>
                                    <span class="normal eyesCondition dotted1">随访</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;：{{analyzeInfo.sf ? analyzeInfo.sf :'无'}}</span>
                                    </span>
                                </div>
                                <!--<div class="report-value-content">-->
                                <!--<span class="normal">屈光不正右眼：</span><span class="report-value"><span-->
                                <!--class="infoSize">{{analyzeInfo.qgbz?analyzeInfo.qgbz :'正常'}}</span></span>-->
                                <!--<span class="normal eyesCondition">屈光不正左眼：</span><span class="report-value"><span-->
                                <!--class="infoSize">{{analyzeInfo.qgbz_left ?analyzeInfo.qgbz_left:'无'}}</span></span>-->
                                <!--</div>-->

                                <div class="report-value-content">
                                    <span class="normal dotted1">转诊</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;：{{analyzeInfo.zz ? analyzeInfo.zz :'否'}}</span>
                                    </span>
                                </div>
                                <div style="margin-top:5px">
                                    <span
                                        :class="[!analyzeInfo.yankadvice || analyzeInfo.yankadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.yankadvice?analyzeInfo.yankadvice:'正常'}}</span>
                                    <!-- <span v-if="!analyzeInfo.yankadvice" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.yankadvice}}</span> -->
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="analyzeInfo.isShiliShow">
                            <img src="../../../assets/medicalExamination/eyesight.png" style="float:left;"/>
                            <div class="personSummaryReport-container">
                                <div class="report-value-content">
                                    <span class="normal">右眼裸眼视力：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.r_eyesight?analyzeInfo.r_eyesight.toFixed(1):'0'}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 15px">左眼裸眼视力：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.l_eyesight?analyzeInfo.l_eyesight.toFixed(1):'0'}}</span></span>
                                    <span class="normal" style="margin-left: 15px">右眼戴镜视力：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.r_bcva?analyzeInfo.r_bcva.toFixed(1):'0'}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 15px">左眼戴镜视力：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.r_bcva?analyzeInfo.r_bcva.toFixed(1):'0'}}</span>
                                    </span>
                                </div>
                                <div style="margin-top:5px">
                                    <!-- <span v-if="!analyzeInfo.eyesadvice" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.eyesadvice}}</span> -->
                                    <span
                                        :class="[!analyzeInfo.eyesadvice || analyzeInfo.eyesadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.eyesadvice?analyzeInfo.eyesadvice:'正常'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="analyzeInfo.isKouqiangShow">
                            <img src="../../../assets/medicalExamination/mouth_cavity.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content"><span class="normal">齿列：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.dentition === 1 ? '整齐':'不齐'}}</span>
                                    </span>
                                    <span class="normal toothCondition">牙周：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.periodontal === 1 ? '正常':'异常'}}</span>
                                    </span>
                                    <span class="normal toothCondition">有无龋齿：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.decayed_tooth === 1? '无':'有'}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">龋患：</span>
                                    <span class="report-value">恒牙<span
                                        class="infoSize">&nbsp;{{analyzeInfo.he_broken}}</span></span>
                                    <span class="report-value">乳牙<span
                                        class="infoSize">&nbsp;{{analyzeInfo.ru_broken}}</span></span>
                                    <span class="normal toothCondition">龋失：</span>
                                    <span class="report-value">恒牙<span
                                        class="infoSize">&nbsp;{{analyzeInfo.he_lose}}</span></span>
                                    <span class="report-value">乳牙<span
                                        class="infoSize">&nbsp;{{analyzeInfo.ru_lose}}</span></span>
                                    <span class="normal toothCondition">龋补：</span>
                                    <span class="report-value">恒牙<span
                                        class="infoSize">&nbsp;{{analyzeInfo.he_repair}}</span></span>
                                    <span class="report-value">乳牙<span
                                        class="infoSize">&nbsp;{{analyzeInfo.ru_repair}}</span></span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal dotted1">其他记录</span>
                                    <span class="report-value"><span
                                        class="infoSize">&nbsp;：{{analyzeInfo.remark?analyzeInfo.remark:'无'}}</span></span>
                                    <div style="margin-top:5px">
                                        <!-- <span v-if="!analyzeInfo.kouqadvice" class="report-normal">结论：正常</span>
                                        <span v-else class="report-error">结论：{{analyzeInfo.kouqadvice}}</span> -->
                                        <span
                                            :class="[!analyzeInfo.kouqadvice || analyzeInfo.kouqadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.kouqadvice?analyzeInfo.kouqadvice:'正常'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="analyzeInfo.isWaikeShow">
                            <img src="../../../assets/medicalExamination/waike.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">皮肤：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.skin_str=='正常'||analyzeInfo.skin_str=='1'||analyzeInfo.skin_str==null?'正常':analyzeInfo.skin_str}}</span>
                                    </span>
                                    <span class="normal toothCondition">淋巴结：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.lymph_str=='正常'||analyzeInfo.lymph_str=='1'||analyzeInfo.lymph_str==null?'未触及':analyzeInfo.lymph_str}}</span>
                                    </span>
                                    <span class="normal toothCondition">头部：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.head_str=='正常'||analyzeInfo.head_str=='1'||analyzeInfo.head_str==null?'正常':analyzeInfo.head_str}}</span>
                                    </span>
                                    <span class="normal toothCondition">颈部：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.neck_str=='正常'||analyzeInfo.neck_str=='1'||analyzeInfo.neck_str==null?'正常':analyzeInfo.neck_str}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">脊柱：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.spine_str=='正常'||analyzeInfo.spine_str=='1'||analyzeInfo.spine_str==null?'正常':analyzeInfo.spine_str}}</span>
                                    </span>
                                    <span class="normal toothCondition">四肢：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.legs_str=='正常'||analyzeInfo.legs_str=='1'||analyzeInfo.legs_str==null?'正常':analyzeInfo.legs_str}}</span>
                                    </span>
                                    <span class="normal toothCondition">胸部：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.throax_str=='正常'||analyzeInfo.throax_str=='1'||analyzeInfo.throax_str==null?'正常':analyzeInfo.throax_str}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal dotted1">其他记录</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;：{{analyzeInfo.other?analyzeInfo.other:'无'}}</span>
                                    </span>
                                    <div style="margin-top:5px">
                                        <span
                                            :class="[!analyzeInfo.waikeadvice || analyzeInfo.waikeadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.waikeadvice?analyzeInfo.waikeadvice:'正常'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="analyzeInfo.isNeikeShow">
                            <img src="../../../assets/medicalExamination/heart.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">近期不适症状：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.recent_unwell?analyzeInfo.recent_unwell:'无'}}</span>
                                    </span>
                                    <span class="normal toothCondition dotted1">其他症状</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;：{{analyzeInfo.other_unwell?analyzeInfo.other_unwell:'无'}}</span>
                                    </span>
                                    <span class="normal toothCondition">心：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.heart_str=='正常'||analyzeInfo.heart_str=='1'||analyzeInfo.heart_str==null?'正常':analyzeInfo.heart_str}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">肺：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.lung_str=='正常'||analyzeInfo.lung_str=='1'||analyzeInfo.lung_str==null?'正常':analyzeInfo.lung_str}}</span>
                                    </span>
                                    <span class="normal toothCondition">肝：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.liver_str=='正常'||analyzeInfo.liver_str=='1'||analyzeInfo.liver_str==null?'正常':analyzeInfo.liver_str}}</span>
                                    </span>
                                    <span class="normal toothCondition">脾：</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">{{analyzeInfo.spleen_str=='正常'||analyzeInfo.spleen_str=='1'||analyzeInfo.spleen_str==null?'正常':analyzeInfo.spleen_str}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal dotted1">其他记录</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;：{{analyzeInfo.other_record?analyzeInfo.other_record:'无'}}</span>
                                    </span>
                                    <div style="margin-top:5px">
                                        <span
                                            :class="[!analyzeInfo.neikeadvice || analyzeInfo.neikeadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.neikeadvice?analyzeInfo.neikeadvice:'正常'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 新增分析 -->
                        <div class="dblinfo" v-if="analyzeInfo.isHuayanShow">
                            <img src="../../../assets/medicalExamination/jianyan.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal dotted2">谷丙转氨酶ALT</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;&nbsp;：{{analyzeInfo.alt}}</span>(U/L)
                                    </span>
                                    <span class="normal dotted2 toothCondition">总胆红素TBIL</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;&nbsp;：{{analyzeInfo.tbil}}</span>(μmol/L)
                                    </span>
                                    <span class="normal dotted2 toothCondition">血红蛋白</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;&nbsp;：{{analyzeInfo.hemoglobin}}</span>(g/L)
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal dotted1">其他化验结果</span>
                                    <span class="report-value">
                                        <span class="infoSize">&nbsp;：{{analyzeInfo.other_clinical?analyzeInfo.other_clinical:'无'}}</span>
                                    </span>
                                    <div style="margin-top:5px">
                                        <span
                                            :class="[!analyzeInfo.jianyadvice || analyzeInfo.jianyadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.jianyadvice?analyzeInfo.jianyadvice:'正常'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="analyzeInfo.isJianchaShow">
                            <img src="../../../assets/medicalExamination/check.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal dotted2">胸部X线检查</span>
                                    <span class="report-value">
                                        <span
                                            class="infoSize">&nbsp;&nbsp;：{{analyzeInfo.x_ray === 1 ? '未见异常':
                                        (analyzeInfo.x_ray === 2 ? '异常' :'')}}</span>
                                    </span>
                                    <div style="margin-top:5px">
                                        <span
                                            :class="[!analyzeInfo.jiancaadvice || analyzeInfo.jiancaadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.jiancaadvice?analyzeInfo.jiancaadvice:'正常'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 升学体检 -->
                        <div class="dblinfo" v-if="phy_type =='2'&&analyzeInfo.isJHBSCShow">
                            <img src="../../../assets/medicalExamination/jiehe.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">结核病筛查检查-----有无卡介苗接种史或卡痕：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.confirm ===1?'有':'无'}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">医生意见：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.doctorResult}}</span>
                                    </span>
                                </div>
                                <div style="margin-top:5px">
                                    <span
                                        :class="[!analyzeInfo.tuberadvice || analyzeInfo.tuberadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.tuberadvice?analyzeInfo.tuberadvice:'正常'}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if="phy_type =='2'&&analyzeInfo.isJHJSShow">
                            <img src="../../../assets/medicalExamination/jiehejun.png" class="anayImg"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal dotted2">结核菌素皮肤试验检查</span>
                                    <span v-if="analyzeInfo.examine === 1" class="report-value normal">&emsp;&nbsp;结果：
                                        <span class="infoSize">{{analyzeInfo.skinresult}}</span>
                                    </span>
                                    <span v-else class="report-value normal">&emsp;&nbsp;异常原因备注：
                                        <span class="infoSize">{{analyzeInfo.skinresult}}</span>
                                    </span>
                                </div>
                                <div style="margin-top:5px">

                                    <span v-if="!analyzeInfo.skinadvice" class="report-normal">结论：正常</span>
                                    <span
                                        :class="[!analyzeInfo.skinadvice || analyzeInfo.skinadvice === '正常'?'report-normal':'report-error']">结论：{{analyzeInfo.skinadvice?analyzeInfo.skinadvice:'正常'}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'printSummaryReport',
        props: ['student_id', 'title', 'flag'],
        data() {
            return {
                phy_type: 1,
                analyzeInfo: {},

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
                // 色觉
                eye_colorCondition: {
                    1: '正常',
                    2: '色盲',
                    3: '色弱',
                    4: '既是色盲又是色弱'
                },
                //结核菌素皮肤试验
                resultCondition: {
                    1: '阴性',
                    2: '一般阳性',
                    3: '中度阳性',
                    4: '强阳性'
                },
                // 胸部
                throaxCondition: {
                    1: '正常',
                    2: '桶状胸',
                    3: '扁平胸',
                    4: '鸡胸',
                    5: '漏斗胸'
                },
                // 口腔--牙周
                // periodontalCondition: {
                //     1: '阴性',
                //     2: '牙龈炎',
                //     3: '牙石',
                //     4: '浅牙周袋',
                //     5: '深牙周袋',
                // },
                // 视力--右眼屈光不正
                r_refractiveCondition: {
                    1: '正常',
                    2: '近视',
                    3: '远视',
                    4: '其他',
                },
            };
        },
        methods: {
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
                } else if (type === 5) {//色觉
                    return this.eye_colorCondition[argu] || '其他';
                } else if (type === 6) {//结核菌素皮肤试验
                    return this.resultCondition[argu] || '其他';
                } else if (type === 7) {//屈光不正
                    return this.r_refractiveCondition[argu] || '其他';
                }
            },
            // 分析
            analyze() {
                let obj = {
                    student_id: this.student_id,
                };
                this.$ajax({
                    url: urls.get_single_info,
                    data: obj
                }).then(data => {
                    if (data.code === 200) {
                        // console.log(data)
                        this.analyzeInfo = data.data;
                        this.phy_type = data.data.phy_type;

                        // this.analyzeInfo.periodontal = this.getDetailCondition(this.analyzeInfo.periodontal, 4);

                        if (this.analyzeInfo.examine) {
                            if (this.analyzeInfo.examine === 1) {//正常检查
                                this.analyzeInfo.skinresult = this.getDetailCondition(this.analyzeInfo.skinresult, 6);
                            } else if (this.analyzeInfo.examine === 2) {//异常不检查
                                this.analyzeInfo.skinresult = this.analyzeInfo.skinremark;
                            }

                        }
                    } else {
                        this.analyzeInfo = {};
                    }
                }).catch(err => {
                    this.analyzeInfo = {};
                });
                this.modal = true;
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.analyze();
        },
    };
</script>
<style lang="less">
    .anaysisModal {
        .ivu-modal-body {
            padding-bottom: 32px !important;

            .scrollBox {
                height: 700px;
                overflow-y: scroll;
                overflow-x: hidden;
            }
        }
    }

    /*.personSummaryReport {*/
    /*.btn-box {*/
    /*margin: 19px 0 0 !important;*/
    /*}*/
    /*}*/

    .report-title {
        margin-top: 35px;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color: #000000;
    }

    .trisection {
        display: inline-block;
        flex: 1;
        margin-bottom: 1%;
        width: 32%;

        img {
            width: 25%;
            margin-top: 4%;
        }
    }

    .rateInfoShow {
        img {
            width: 8%;
            margin-top: 2%;
        }
    }

    .dblinfo {
        // height: 100px;
        // margin-bottom: 16px;
        margin-bottom: 2%;

        img {
            width: 8%;
            margin-top: 1%;
        }
    }

    .anayImg {
        float: left;
    }

    .personSummaryReport-container {
        overflow: auto;
        // float: left;
        padding-left: 16px;

        .report-value-content {
            position: relative;
            padding-top: 10px;
            color: #000000;
            font-size: 14px;

            .qgInfo {
                float: left;
                margin-left: 8px;
                margin-top: -6px;

                .report-value {
                    span {
                        margin-right: 6px;
                        font-weight: normal;
                    }
                }
            }

            .toothCondition {
                margin-left: 10px;
            }

            .eyesCondition {
                margin-left: 20px;
            }
        }

        .normal {
            font-weight: 400;
            color: #333;
        }

        .dotted1 {
            position: relative;

            &:after {
                position: absolute;
                content: '*';
                height: 8px;
                width: 8px;
                top: 0;
                margin-left: 1px;
            }
        }

        .dotted2 {
            position: relative;

            &:after {
                position: absolute;
                content: '**';
                height: 8px;
                width: 8px;
                top: 0;
                margin-left: 1px;
            }
        }

        .report-error {
            font-size: 14px !important;
            color: #ed5145;
        }

        .report-normal {
            font-size: 14px !important;
            color: #299E97;
        }

        .report-value {
            .infoSize {
                font-size: 14px !important;
                color: #000;
                font-weight: 400
            }
        }
    }

    .ivu-tooltip, .ivu-tooltip-rel {
        display: inline-block;
        vertical-align: middle !important;
    }
</style>

