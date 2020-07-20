<template>
    <div class="analysis">
        <Modal
            :title="title"
            :value="true"
            :width="1000"
            :mask-closable="false"
            @on-cancel="close"
            class="anaysisModals"
            footer-hide
        >
            <div class="monitorElecReportBox">
                <div style="display: flex">
                    <div style="width: 26%;">
                        <img style="width:100%;height:70%" src="../../../assets/medicalExamination/peoson.png"
                             alt="people"/>
                        <div class="report-title">{{analyzeInfo.student_name}}体质监测报告分析</div>
                    </div>
                    <!-- 分析数据详情-->
                    <div class="anayDataInfo" style="margin-left: 40px;flex: 1;display: flex;flex-direction: column;">
                        <div class="dblinfo" v-if='analyzeInfo.isxintiadvice===1'>
                            <img src="../../../assets/medicalExamination/height.png" class="anayImg"
                                 style="margin-top:10px;"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">身高：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.height}}</span>CM
                                    </span>
                                    <span class="normal" style="margin-left: 20px">体重：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.weight}}</span>KG
                                    </span>
                                    <span class="normal" style="margin-left: 20px;">BMI：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.bmi}}</span></span>
                                    <!--<span class="normal" style="margin-left: 20px">课桌椅型号：</span>-->
                                    <!--<span class="report-value">-->
                                        <!--<span class="infoSize">{{analyzeInfo.tablesChairs}}</span>-->
                                    <!--</span>-->
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.xintiadvice || analyzeInfo.xintiadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：bmi={{analyzeInfo.bmi}},{{analyzeInfo.xintiadvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isxiongwadvice===1'>
                            <img src="../../../assets/medicalExamination/xb.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">胸围：</span>
                                    <span class="report-value"><span
                                        class="infoSize">{{analyzeInfo.chest}}</span></span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.xiongwadvice || analyzeInfo.xiongwadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.xiongwadvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isxueyadvice===1'>
                            <img src="../../../assets/medicalExamination/blood_pressure.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">收缩压：</span>
                                    <span class="report-value"><span
                                        class="infoSize">{{analyzeInfo.sp}}</span>mmHg</span>
                                    <span class="normal" style="margin-left: 20px">舒张压：</span>
                                    <span class="report-value"><span
                                        class="infoSize">{{analyzeInfo.dp}}</span>mmHg</span>
                                    <span class="normal" style="margin-left: 20px">脉搏：</span>
                                    <span class="report-value"><span
                                        class="infoSize">{{analyzeInfo.pulse}}</span>次/分</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.xueyadvice || analyzeInfo.xueyadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.xueyadvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isshiliadvice===1'>
                            <img src="../../../assets/medicalExamination/eyesight.png" style="float:left;"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">右眼裸眼视力：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.r_eyesight}}</span></span>
                                    <span class="normal" style="margin-left: 20px">左眼裸眼视力：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.l_eyesight}}</span></span>
                                    <span class="normal" style="margin-left: 20px">右眼戴镜视力：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.r_bcva}}</span>
                                    </span>
                                    <span class="normal" style="margin-left: 20px">左眼戴镜视力：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.l_bcva}}</span>
                                    </span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">屈光临床印象：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.lcyx}}</span>
                                    </span>
                                </div>
                                <!--<div class="report-value-content"><span class="normal">屈光不正右眼：</span><span-->
                                    <!--class="report-value"><span-->
                                    <!--class="infoSize">{{analyzeInfo.r_refractive}}</span></span>-->
                                    <!--<span class="normal" style="margin-left: 20px">屈光不正左眼：</span>-->
                                    <!--<span class="report-value"><span-->
                                        <!--class="infoSize">{{analyzeInfo.l_refractive}}</span></span>-->
                                <!--</div>-->
                                <!--<div class="report-value-content"><span class="normal">临床印象：</span><span-->
                                <!--class="report-value"><span-->
                                <!--class="infoSize">{{analyzeInfo.r_refractive}}</span></span>-->
                                <!--</div>-->
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.shiliadvice || analyzeInfo.shiliadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.shiliadvice}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="dblinfo" v-if='analyzeInfo.iskouqadvice===1'>
                            <img src="../../../assets/medicalExamination/mouth_cavity.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">齿列：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.dentition === 1 ? '整齐':'不齐'}}</span></span>
                                    <span class="normal toothCondition">牙周：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.periodontal}}</span></span>
                                    <span class="normal toothCondition">有无龋齿：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.decayed_tooth === 1? '无':'有'}}</span></span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">龋患：</span>
                                    <span class="report-value">恒牙
                                        <span class="infoSize">&nbsp;{{analyzeInfo.qhhen}}</span></span>
                                    <span class="report-value">乳牙
                                        <span class="infoSize">&nbsp;{{analyzeInfo.qhru}}</span></span>
                                    <span class="normal toothCondition">龋失：</span>
                                    <span class="report-value">恒牙
                                        <span class="infoSize">&nbsp;{{analyzeInfo.qshen}}</span></span>
                                    <span class="report-value">乳牙
                                        <span class="infoSize">&nbsp;{{analyzeInfo.qsru}}</span></span>
                                    <span class="normal toothCondition">龋补：</span>
                                    <span class="report-value">恒牙
                                        <span class="infoSize">&nbsp;{{analyzeInfo.qbhen}}</span></span>
                                    <span class="report-value">乳牙
                                        <span class="infoSize">&nbsp;{{analyzeInfo.qbru}}</span></span>
                                    <div style="margin-top:5px">
                                        <span v-if="!analyzeInfo.kouqadvice || analyzeInfo.kouqadvice==='正常'" class="report-normal">结论：正常</span>
                                        <span v-else class="report-error">结论：{{analyzeInfo.kouqadvice}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dblinfo" v-if='analyzeInfo.isneikeadvice===1'>
                            <img src="../../../assets/medicalExamination/heart.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">近期不适：</span>
                                    <span class="report-value"><span
                                        class="infoSize">{{analyzeInfo.recent_unwell}}</span></span>
                                    <span class="normal" style="margin-left: 30px">心率：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.heart_rate}}</span>次/分钟</span>
                                    <span class="normal" style="margin-left: 30px">心脏杂音：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.cardiac_souffle === 1?'无':'有'}}</span></span>
                                    <span class="normal" style="margin-left: 30px">心律：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.cardiac_rhythm === 1?'齐':analyzeInfo.cardiac_rhythm === 2?'不齐':'绝对不齐'}}</span></span>
                                    <span class="normal" style="margin-left: 30px">肺：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.lung_rale === 1?'正常':analyzeInfo.lung_rale === 2?'干':'湿'}}</span></span>
                                    <span class="normal" style="margin-left: 10px">肝：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.liver === 1?'正常':'肝大'}}</span></span>
                                    <span class="normal" style="margin-left: 30px">脾：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.spleen === 1?'正常':'脾大'}}</span></span>
                                </div>

                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.neikeadvice || analyzeInfo.neikeadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.neikeadvice}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display: flex;margin-top:10px;">
                    <div style="width: 26%;" v-if="analyzeInfo.gender===1">
                        <img style="width:100%;margin-top:50px;" src="../../../assets/medicalExamination/man.png"
                             alt="people"/>
                        <div class="report-title">{{analyzeInfo.student_name}}体质监测报告分析</div>
                    </div>
                    <div style="width: 26%;" v-if="analyzeInfo.gender===2">
                        <img style="width:100%;margin-top:50px;" src="../../../assets/medicalExamination/women.png"
                             alt="people"/>
                        <div class="report-title">{{analyzeInfo.student_name}}体质监测报告分析</div>
                    </div>

                    <!-- 分析数据详情-->
                    <div class="anayDataInfo" style="margin-left: 40px;flex: 1;display: flex;flex-direction: column;">
                        <div class="dblinfo" v-if='analyzeInfo.isgripAdvcie===1'>
                            <img src="../../../assets/medicalExamination/wo.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">握力：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.grip}}</span>KG</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.gripAdvcie || analyzeInfo.gripAdvcie==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.gripAdvcie}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isfeihladvice===1'>
                            <img src="../../../assets/medicalExamination/lung.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">肺活量：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.vital_capacity}}</span>ML</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.feihladvice || analyzeInfo.feihladvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.feihladvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.iszwqqtadvice===1'>
                            <img src="../../../assets/medicalExamination/sit-and-reach.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">坐位前屈体：</span><span class="report-value">
                                    <span class="infoSize">{{analyzeInfo.bent_forward}}</span>CM</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.zwqqtadvice || analyzeInfo.zwqqtadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.zwqqtadvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.ispullUpAdvcie===1'>
                            <img src="../../../assets/medicalExamination/pull_up.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">引体向上：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.pull_up}}</span>次</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.pullUpAdvcie || analyzeInfo.pullUpAdvcie==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.pullUpAdvcie}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isldtyadvice===1'>
                            <img src="../../../assets/medicalExamination/sargent_jump.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">立定跳远：</span>
                                    <span class="report-value">
                                        <span class="infoSize">{{analyzeInfo.standing_jump}}</span>CM
                                    </span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.ldtyadvice || analyzeInfo.ldtyadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else class="report-error">结论：{{analyzeInfo.ldtyadvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isyfzywqzadvice===1'>
                            <img src="../../../assets/medicalExamination/sit-up.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">一分钟仰卧起坐：</span>
                                    <span class="report-value"><span
                                        class="infoSize">{{analyzeInfo.sit_up}}</span>次</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.yfzywqzadvice || analyzeInfo.yfzywqzadvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.yfzywqzadvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isfiveadvcie===1'>
                            <img src="../../../assets/medicalExamination/50m.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">50米跑：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.run_fiftym}}</span>秒</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.fiveadvcie || analyzeInfo.fiveadvcie==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.fiveadvcie}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isobliquePullupsAdvice===1'>
                            <img src="../../../assets/medicalExamination/oblique_pullups.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">斜身引体：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.oblique_pullups}}</span>次</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.pullUpAdvcie || analyzeInfo.pullUpAdvcie==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.pullUpAdvcie}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isrunbackFiftymAdvice===1'>
                            <img src="../../../assets/medicalExamination/runback_fiftym.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">50*8往返跑：</span><span class="report-value"><span
                                    class="infoSize">{{analyzeInfo.runback_fiftym}}</span>秒</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.runbackFiftymAdvice || analyzeInfo.runbackFiftymAdvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.runbackFiftymAdvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isrunEhmAdvice===1'>
                            <img src="../../../assets/medicalExamination/run_ehm.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">800米跑：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.run_ehm}}</span>秒</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.runEhmAdvice || analyzeInfo.runEhmAdvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.runEhmAdvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isrunOthmAdvice===1'>
                            <img src="../../../assets/medicalExamination/run_othm.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">1000米跑：</span><span class="report-value"><span
                                    class="infoSize">{{analyzeInfo.run_othm}}</span>秒</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.runOthmAdvice || analyzeInfo.runOthmAdvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.runOthmAdvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isbackStomachAdvice===1'>
                            <img src="../../../assets/medicalExamination/fu.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">俯卧背起：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.back_stomach}}</span>次</span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.backStomachAdvice || analyzeInfo.backStomachAdvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.backStomachAdvice}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- 新加 -->
                        <div class="dblinfo" v-if='analyzeInfo.isbackStomachAdvice===2 && analyzeInfo.gender ===2'>
                            <img src="../../../assets/medicalExamination/main.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">月经初潮：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.menstruation}}</span></span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.menstruationAdvice || analyzeInfo.menstruationAdvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.menstruationAdvice}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="dblinfo" v-if='analyzeInfo.isbackStomachAdvice===2 && analyzeInfo.gender ===1'>
                            <img src="../../../assets/medicalExamination/main.png" class="anayImg"/>
                            <div class="monitorElecReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">首次遗精：</span>
                                    <span class="report-value"><span class="infoSize">{{analyzeInfo.gonacratia}}</span></span>
                                </div>
                                <div style="margin-top:5px">
                                    <span v-if="!analyzeInfo.gonacratiaAdvice || analyzeInfo.gonacratiaAdvice==='正常'" class="report-normal">结论：正常</span>
                                    <span v-else  class="report-error">结论：{{analyzeInfo.gonacratiaAdvice}}</span>
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
    import urls from '@/service/Urls';

    export default {
        name: 'printSummaryReport',
        props: ['title', 'flag', 'row'],
        data() {
            return {
                analyzeInfo: {
                    isxintiadvice: '', // 形体
                    height: '',
                    weight: '',
                    bmi: '',
                    // tablesChairs: '',
                    xintiadvice: '',

                    isxiongwadvice: '', // 胸围
                    xiongwadvice: '',
                    chest: '',

                    isxueyadvice: '', // 血压
                    sp: '',
                    dp: '',
                    pulse: '',
                    xueyadvice: '',

                    isshiliadvice: '', // 视力
                    r_eyesight: '',
                    l_eyesight: '',
                    r_bcva: '',
                    l_bcva: '',
                    eyesadvice: '',
                    r_refractive: '',
                    shiliadvice: '',
                    lcyx: '',

                    ykdaice: '',
                    runOthmAdvice: '',
                    isrunbackFiftymAdvice: '',
                    iszwqqtadvice: '',
                    runback_fiftym: '',
                    student_name: '',

                    runEhmAdvice: '',
                    gender: '',
                    recent_unwell: '',
                    r_positivelens: '',
                    r_negativefilm: '',
                    l_positivelens: '',
                    l_negativefilm: '',
                    pullUpAdvcie: '',
                    runbackFiftymAdvice: '',
                    fiveadvcie: '',

                    spadvice: '',


                    iskouqadvice: '', // 口腔
                    qhhen: '',
                    qhru: '',
                    qshen: '',
                    qsru: '',
                    qbhen: '',
                    qbru: '',
                    kouqadvice: '',
                    decayed_tooth: '',
                    periodontal: '',
                    dentition: '',
                    isneikeadvice: '',
                    isbackStomachAdvice: '',
                    gonacratia: '',
                    backStomachAdvice: '',
                    heart_rate: '',
                    cardiac_souffle: '',
                    cardiac_rhythm: '',
                    lung_rale: '',
                    liver: '',
                    spleen: '',
                    neikeadvice: ''
                },
                // 口腔--牙周
                periodontalCondition: {
                    1: '阴性',
                    2: '牙龈炎',
                    3: '牙石',
                    4: '浅牙周袋',
                    5: '深牙周袋',
                },
                // 视力--右眼串镜正片
                r_positivelensCondition: {
                    0: '0',
                    1: '↑',
                    2: '↓',
                },
                // 视力--右眼屈光不正
                r_refractiveCondition: {
                    0: '正常',
                    1: '近视',
                    2: '远视',
                },
            };
        },
        methods: {
            // 分析参数取值
            getDetailCondition(argu, type) {
                if (type === 1) {//牙周
                    return this.periodontalCondition[argu] || '其他';
                } else if (type === 2) {//串镜
                    return this.r_positivelensCondition[argu] || '其他';
                } else if (type === 3) {//屈光不正
                    return this.r_refractiveCondition[argu] || '其他';
                }

            },

            //近期不适
            mapping(num) {
                switch (num) {
                    case '1':
                        return '疲乏无力';
                    case '2':
                        return '低热';
                    case '3':
                        return '盗汗';
                    case '4':
                        return '胸痛';
                    case '5':
                        return '咳嗽';
                    case '6':
                        return '咳痰';
                    case '7':
                    case '8':
                        return '消瘦';
                    default:
                        return '';
                }
            },
            // 分析
            analyze() {
                this.$ajax({
                    url: urls.monitorReport_analysis,
                    data: {
                        student_id: this.row.id,
                        year: this.row.year,
                        age: this.row.age,
                        gender: this.row.gender
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.analyzeInfo = data.data;
                        this.analyzeInfo.periodontal = this.getDetailCondition(this.analyzeInfo.periodontal, 1);
                        this.analyzeInfo.r_positivelens = this.getDetailCondition(this.analyzeInfo.r_positivelens, 2);
                        this.analyzeInfo.r_negativefilm = this.getDetailCondition(this.analyzeInfo.r_negativefilm, 2);
                        this.analyzeInfo.l_positivelens = this.getDetailCondition(this.analyzeInfo.l_positivelens, 2);
                        this.analyzeInfo.l_negativefilm = this.getDetailCondition(this.analyzeInfo.l_negativefilm, 2);
                        this.analyzeInfo.r_refractive = this.getDetailCondition(this.analyzeInfo.r_refractive, 3);
                        this.analyzeInfo.l_refractive = this.getDetailCondition(this.analyzeInfo.l_refractive, 3);

                        if (data.data.gender) {
                            this.analyzeInfo.gender = data.data.gender;
                        }
                        //近期不适
                        // if (data.data.recent_unwell != null) {
                        //     let recent_unwell_Data = data.data.recent_unwell.split(',');
                        //     let lastString = '';
                        //     recent_unwell_Data.forEach(element => {
                        //         lastString += this.mapping(element) + ',';
                        //
                        //     });
                        // } else {
                        //     this.analyzeInfo.recent_unwell = '无';
                        // }
                        this.analyzeInfo.gonacratia = data.data.gonacratia === 0 ? '已' : data.data.gonacratia === 2 ? '未' : data.data.gonacratia === 9 ? '不能回答' : '已';
                        this.analyzeInfo.menstruation = data.data.menstruation === 0 ? '已' : data.data.menstruation === 2 ? '未' : data.data.menstruation === 9 ? '不能回答' : '已';

                    } else {
                        this.analyzeInfo = {};
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.analyzeInfo = {};
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.analyze();
        }
    };
</script>
<style scoped lang="less">
    .anaysisModals {
        .ivu-modal {
            min-width: 1000px;
            top: 54px !important;

            .ivu-modal-body {
                position: relative;
                padding: 20px 25px 10px 25px !important;
            }

            .sub-tip {
                position: absolute;
                bottom: -20px;
                right: 31px;
                font-size: 14px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
            }
        }
    }

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
        }

        .normal {
            font-weight: 600;
        }

        .report-error {
            font-size: 14px !important;
            color: #ed5145;
        }

        .report-normal {
            font-size: 14px !important;
            color: #299E97;
        }

    }

    .personSummaryReport-container {
        .report-value-content {
            position: relative;

            .toothCondition {
                margin-left: 16px;
            }

            .eyesCondition {
                margin-left: 20px;
            }
        }

        .report-value {
            .infoSize {
                font-size: 14px !important;
            }
        }

        .report-normal, .report-error {
            font-size: 14px !important;
        }
    }

    .ivu-tooltip,
    .ivu-tooltip-rel {
        display: inline-block;
        vertical-align: middle !important;
    }
</style>

