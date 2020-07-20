<template>
    <div>
        <Modal
            :title="title"
            :value="true"
            :width="1200"
            class="electronicReportInfo"
            :mask-closable="false"
            @on-cancel="close"
            :footer-hide="true"
        >
            <div style="position: relative;margin-bottom:50px">
                <Form ref="obj" label-position="left">
                    <Row>
                        <i-col span="6">
                            <FormItem class="first-label" label="学校名称" :label-width="80">
                                <i-input v-model="obj.school_name" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="4">
                            <FormItem label="年级" class="right-label" :label-width="60">
                                <i-input v-model="obj.grade_name" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="班级" class="right-label" :label-width="60">
                                <i-input v-model="obj.class_name" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="姓名" class="right-label" :label-width="60">
                                <i-input v-model="obj.student_name" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="性别" class="right-label" :label-width="60">
                                <i-input v-model="obj.gender" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="5">
                            <FormItem label="身份证号" class="right-label" :label-width="80">
                                <i-input v-model="obj.card_num" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="3">
                            <FormItem class="first-label" label="是否住宿" :label-width="80">
                                <i-input v-model="obj.is_boarding" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem class="right-label" label="民族" :label-width="50">
                                <i-input v-model="obj.nation" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="18">
                            <FormItem label="既往病史" class="right-label" :label-width="90">
                                <Tooltip :content="obj.anamnesis" style="width: 100%;" v-if='obj.anamnesis'>
                                    <i-input v-model="obj.anamnesis" :disabled="flag"></i-input>
                                </Tooltip>
                                <i-input v-model="obj.anamnesis" :disabled="flag" v-else></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row style="margin-bottom: 20px!important">
                        <i-col span="6">
                            <FormItem class="first-label" label="体检日期" :label-width="80">
                                <i-input v-model="obj.create_time" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="18">
                            <FormItem label="残疾情况" class="right-label" :label-width="90">
                                <Tooltip :content="obj.disability" style="width: 100%;" v-if='obj.disability!=null'>
                                    <i-input v-model="obj.disability" :disabled="flag"></i-input>
                                </Tooltip>
                                <i-input v-model="obj.disability" :disabled="flag" v-else></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="80">
                        <i-col span="12">
                            <h4 class="bodys"><span></span>一般</h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <FormItem class="first-label" label="身 高(cm)" :label-width="80">
                                        <span slot="label">身高(cm)</span>
                                        <i-input v-model="obj.height" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="体 重(kg)" class="right-label" :label-width="70">
                                        <span slot="label">体重(kg)</span>
                                        <i-input v-model="obj.weight" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem class="first-label" label="BMI" :label-width="40">
                                        <i-input v-model="obj.bmi" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <!--<i-col span="6">-->
                                <!--<FormItem class="first-label pad" label="课桌椅型号" :label-width="70">-->
                                <!--<i-input v-model="obj.desk_mat" style="width: 50px;" :disabled="flag"></i-input>-->
                                <!--</FormItem>-->
                                <!--</i-col>-->
                            </Row>
                            <h4 class="bodys">生理功能</h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <FormItem class="first-label pad" label="收缩压" :label-width="80">
                                        <span slot="label">收缩压(mmHg)</span>
                                        <i-input v-model="obj.sp"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="舒张压(mmHg)" class="first-label pad" :label-width="80">
                                        <span slot="label">舒张压(mmHg)</span>
                                        <i-input v-model="obj.dp"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="脉 搏(次/分钟)" class="first-label pad" :label-width="80">
                                        <span slot="label">脉&emsp;搏(次/分钟)</span>
                                        <i-input v-model="obj.pulse"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">视力</h4>
                            <Row :gutter="16">
                                <i-col span="4">
                                    <FormItem label="裸眼视力" :label-width="80">
                                    </FormItem>
                                </i-col>
                                <i-col span="10">
                                    <FormItem label="右  眼" :label-width="60">
                                        <span slot="label">右&emsp;眼</span>
                                        <i-input v-model="obj.r_eyesight"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="10">
                                    <FormItem label="左   眼" :label-width="60">
                                        <span slot="label">左&emsp;眼</span>
                                        <i-input v-model="obj.l_eyesight"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="4">
                                    <FormItem label="戴镜视力" :label-width="80">
                                    </FormItem>
                                </i-col>
                                <i-col span="10">
                                    <FormItem label="右眼" :label-width="60">
                                        <span slot="label">右&emsp;眼</span>
                                        <i-input v-model="obj.r_positivelens"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="10">
                                    <FormItem label="左眼" :label-width="60">
                                        <span slot="label">左&emsp;眼</span>
                                        <i-input v-model="obj.l_positivelens"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row class="label-pad" :gutter="16">
                                <i-col span="12">
                                    <Row>
                                        <i-col span="6">
                                            <FormItem class="pad" label="屈光度右眼" :label-width="60">
                                            </FormItem>
                                        </i-col>
                                        <i-col span="18">
                                            <Row>
                                                <i-col span="24">
                                                    <FormItem label="①+②-③0 球镜(S)" :label-width="140">
                                                        <i-input v-model="obj.r_s"
                                                                 :disabled="flag"></i-input>
                                                    </FormItem>
                                                </i-col>
                                            </Row>
                                            <Row>
                                                <i-col span="24">
                                                    <FormItem label="①+②-③0 球镜(C)" :label-width="140">
                                                        <i-input v-model="obj.r_c"
                                                                 :disabled="flag"></i-input>
                                                    </FormItem>
                                                </i-col>
                                            </Row>
                                            <Row>
                                                <i-col span="24">
                                                    <FormItem label="轴向值(A)" :label-width="80">
                                                        <i-input v-model="obj.r_a"
                                                                 :disabled="flag"></i-input>
                                                    </FormItem>
                                                </i-col>
                                            </Row>
                                            <!--<Row>-->
                                            <!--<i-col span="24">-->
                                            <!--<FormItem label="屈光不正" :label-width="80">-->
                                            <!--<i-input v-model="obj.qgbz" style="width: 100%;"-->
                                            <!--:disabled="flag"></i-input>-->
                                            <!--</FormItem>-->
                                            <!--</i-col>-->
                                            <!--</Row>-->
                                        </i-col>
                                    </Row>
                                </i-col>
                                <i-col span="12">
                                    <Row>
                                        <i-col span="6">
                                            <FormItem class="pad" label="屈光度左眼" :label-width="60">
                                            </FormItem>
                                        </i-col>
                                        <i-col span="18">
                                            <Row>
                                                <i-col span="24">
                                                    <FormItem label="①+②-③0 球镜(S)" :label-width="140">
                                                        <i-input v-model="obj.l_s"
                                                                 :disabled="flag"></i-input>
                                                    </FormItem>
                                                </i-col>
                                            </Row>
                                            <Row>
                                                <i-col span="24">
                                                    <FormItem label="①+②-③0 球镜(C)" :label-width="140">
                                                        <i-input v-model="obj.l_c"
                                                                 :disabled="flag"></i-input>
                                                    </FormItem>
                                                </i-col>
                                            </Row>
                                            <Row>
                                                <i-col span="24">
                                                    <FormItem label="轴向值(A)" :label-width="80">
                                                        <i-input v-model="obj.l_a"
                                                                 :disabled="flag"></i-input>
                                                    </FormItem>
                                                </i-col>
                                            </Row>
                                            <!--<Row>-->
                                            <!--<i-col span="24">-->
                                            <!--<FormItem label="屈光不正" :label-width="80">-->
                                            <!--<i-input v-model="obj.qgbz_left" style="width: 100%;"-->
                                            <!--:disabled="flag"></i-input>-->
                                            <!--</FormItem>-->
                                            <!--</i-col>-->
                                            <!--</Row>-->
                                        </i-col>
                                    </Row>

                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="屈光临床印象" :label-width="60">
                                        <span slot="label">屈光临床印象</span>
                                        <i-input v-model="obj.result_lcyx" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">内科</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="first-label pad" label="近期不适症状" :label-width="60">
                                        <i-input v-model="obj.recent_unwell"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="心率(次/分钟)" class="first-label pad" :label-width="80">
                                        <span slot="label">心&emsp;率(次/分钟)</span>
                                        <i-input v-model="obj.heart_rate"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="心脏杂音" class="pad right-label" :label-width="70">
                                        <span slot="label">心脏杂音&emsp;&emsp;</span>
                                        <i-input v-model="obj.cardiac_souffle"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="心律" class="right-label" :label-width="70">
                                        <span slot="label">心&emsp;律</span>
                                        <i-input v-model="obj.cardiac_rhythm"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <FormItem label="肺部罗音" class="pad" :label-width="60">
                                        <i-input v-model="obj.lung_rale"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="肝" class="right-label" :label-width="70">
                                        <span slot="label">&emsp;&emsp;肝</span>
                                        <i-input v-model="obj.liver" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="脾" class="right-label" :label-width="70">
                                        <span slot="label">&emsp;&emsp;脾</span>
                                        <i-input v-model="obj.spleen" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">需复查项目</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.need_agains"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">本次体质监测结论</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input type="textarea" v-model="obj.main_inspection" :rows="5"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </i-col>
                        <i-col span="12">
                            <h4 class="bodys">口腔科</h4>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem class="first-label" label="齿列" :label-width="60">
                                        <span slot="label">齿&emsp;列</span>
                                        <i-input v-model="obj.dentition"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="牙周" class="right-label" :label-width="60">
                                        <span slot="label">牙&emsp;周</span>
                                        <i-input v-model="obj.periodontal"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="有无龋齿" class="pad right-label" :label-width="60">
                                        <span slot="label">有无龋齿&emsp;&emsp;</span>
                                        <i-input v-model="obj.decayed_tooth"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <br>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="12">
                                    <Row :gutter="6">
                                        <i-col span="14">
                                            <FormItem label="龋患" :label-width="60">
                                                <span slot="label">龋&emsp;患</span>
                                                <i-input v-model="obj.he_broken"
                                                         :disabled="flag"></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="10">
                                            <FormItem :label-width="0">
                                                <i-input v-model="obj.ru_broken"
                                                         :disabled="flag"></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>
                                <i-col span="12">
                                    <Row :gutter="6">
                                        <i-col span="14">
                                            <FormItem label="龋失" class="" :label-width="60">
                                                <span slot="label">龋&emsp;失</span>
                                                <i-input v-model="obj.he_lose" :disabled="flag"></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="10">
                                            <FormItem :label-width="0">
                                                <i-input v-model="obj.ru_lose" :disabled="flag"></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>

                                <i-col span="12">
                                    <Row :gutter="6">
                                        <i-col span="14">
                                            <FormItem label="龋补" :label-width="60">
                                                <span slot="label">龋&emsp;补</span>
                                                <i-input v-model="obj.he_repair"
                                                         :disabled="flag"></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="10">
                                            <FormItem :label-width="0">
                                                <i-input v-model="obj.ru_repair"
                                                         :disabled="flag"></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>

                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <h4 class="bodys">胸围</h4>
                                    <FormItem label="胸围(cm)" :label-width="75">
                                        <i-input v-model="obj.chest" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <h4 class="bodys">肺活量</h4>
                                    <FormItem label="成绩(ml)" :label-width="75">
                                        <i-input v-model="obj.vital_capacity"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>

                                <i-col span="8">
                                    <h4 class="bodys">50米跑</h4>
                                    <FormItem label="时间(s)" :label-width="60">
                                        <i-input v-model="obj.run_fiftym"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>


                            <Row :gutter="16">
                                <i-col span="8">
                                    <h4 class="bodys">一分钟仰卧起坐</h4>
                                    <FormItem label="次数(次)" :label-width="75">
                                        <i-input v-model="obj.sit_up" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <h4 class="bodys">握力</h4>
                                    <FormItem label="握力(kg)" :label-width="75">
                                        <i-input v-model="obj.grip" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>

                                <i-col span="8">
                                    <h4 class="bodys">50*8往返跑</h4>
                                    <FormItem label="时间(s)" :label-width="60">
                                        <i-input v-model="obj.runback_fiftym"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <h4 class="bodys">立定跳远</h4>
                                    <FormItem label="距离(cm)" :label-width="75">
                                        <i-input v-model="obj.standing_jump"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <h4 class="bodys">斜身引体</h4>
                                    <FormItem label="次数(次)" :label-width="60">
                                        <i-input v-model="obj.oblique_pullups"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <h4 class="bodys">引体向上</h4>
                                    <FormItem label="次数(次)" :label-width="60">
                                        <i-input v-model="obj.pull_up" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <h4 class="bodys">800米跑</h4>
                                    <FormItem label="时间(s)" :label-width="60">
                                        <i-input v-model="obj.run_ehm" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <h4 class="bodys">1000米跑</h4>
                                    <FormItem label="时间(s)" :label-width="60">
                                        <i-input v-model="obj.run_othm" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <h4 class="bodys">坐位体前屈</h4>
                                    <FormItem label="距离(cm)" :label-width="75">
                                        <i-input v-model="obj.bent_forward"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <h4 class="bodys">俯卧背起</h4>
                                    <FormItem label="次数(次)" :label-width="75">
                                        <i-input v-model="obj.back_stomach"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8" v-if="obj.gender === '男'">
                                    <h4 class="bodys">首次遗精</h4>
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.gonacratia"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8" v-if="obj.gender === '女'">
                                    <h4 class="bodys">月经初期</h4>
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.menstruation"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">健康指导</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input type="textarea" v-model="obj.health_guide"
                                                 :autosize="{minRows: 4,maxRows: 8}"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </i-col>
                    </Row>
                </Form>
<!--                <span class="sub-tip">苏州市疾病预防控制中心</span>-->
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        name: 'electronicReportInfo',
        props: ['title', 'flag', 'row'],
        data() {
            return {
                obj: {                //个人体检详细信息
                    dep_id: '',
                    school_name: '',
                    grade_name: '',
                    class_name: '',
                    student_name: '',
                    gender: '',
                    anamnesis: '',
                    card_num: '',
                    main_inspection: '',
                    need_agains: '',
                    is_boarding: '',
                    disability: '',

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
                    r_positivelens: '',
                    l_positivelens: '',
                    r_bcva: '',
                    l_bcva: '',
                    r_s: '',
                    r_c: '',
                    r_a: '',
                    qgbz: '',
                    l_s: '',
                    l_c: '',
                    l_a: '',
                    qgbz_left: '',
                    pd: '',


                    // r_refractive: '',
                    // l_refractive: '',

                    //口腔科
                    dentition: '',
                    periodontal: '',
                    decayed_tooth: '',
                    he_broken: '',
                    he_lose: '',
                    he_repair: '',
                    ru_broken: '',
                    ru_lose: '',
                    ru_repair: '',

                    //内科
                    recent_unwell: '',
                    heart_rate: '',
                    cardiac_souffle: '',
                    cardiac_rhythm: '',
                    lung_rale: '',
                    liver: '',
                    spleen: '',

                    //主检
                    create_time: '',
                    health_guide: '',

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

                    gonacratia: '',
                    menstruation: ''

                },
                qgCondition: {
                    1: '正常',
                    2: '近视',
                    3: '远视',
                    4: '其他'
                },
                gradeList: [],
                is_manage: true
            };
        },
        methods: {
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
                        return '食欲减退';
                    case '8':
                        return '消瘦';
                    default:
                        return '';
                }
            },

            //复测个人信息详情
            getRetestInfo() {
                this.$ajax({
                    url: urls.monitorReport_info,
                    data: {
                        id: this.row.id
                    }
                }).then(data => {

                    if (data.code === 200) {
                        let _data = data.data;
                        this.obj = _data;
                        this.obj.is_boarding = _data.is_boarding === 1 ? '是' : '否';
                        this.obj.gender = _data.gender === 1 ? '男' : '女';
                        this.obj.anamnesis = _data.anamnesis ? _data.anamnesis : '无';
                        this.obj.dentition = _data.dentition === 1 ? '整齐' : '不齐';
                        this.obj.decayed_tooth = _data.decayed_tooth === 1 ? '有' : '无';
                        this.obj.liver = _data.liver === 1 ? '正常' : '肝大';
                        this.obj.spleen = _data.spleen === 1 ? '正常' : '脾大';
                        this.obj.cardiac_souffle = _data.cardiac_souffle === 1 ? '无' : '有';
                        this.obj.disability = _data.disability ? _data.disability : '无';
                        this.obj.nation = _data.nation ? _data.nation : '汉';

                        //视力
                        this.obj.r_eyesight = _data.r_eyesight ? _data.r_eyesight.toFixed(1) : '';
                        this.obj.l_eyesight = _data.l_eyesight ? _data.l_eyesight.toFixed(1) : '';
                        this.obj.r_positivelens = _data.r_positivelens ? _data.r_positivelens.toFixed(1) : '';
                        this.obj.l_positivelens = _data.l_positivelens ? _data.l_positivelens.toFixed(1) : '';
                        this.obj.r_bcva = _data.r_bcva ? _data.r_bcva.toFixed(1) : '';
                        this.obj.l_bcva = _data.l_bcva ? _data.l_bcva.toFixed(1) : '';
                        this.obj.r_s = _data.r_s ? `${_data.r_s.toFixed(1)}D` : '';
                        this.obj.r_c = _data.r_c ? `${_data.r_c.toFixed(1)}D` : '';
                        this.obj.r_a = _data.r_a ? `${_data.r_a.toFixed(1)}°` : '';

                        this.obj.qgbz = this.getDetailCondition(_data.qgbz, 6);
                        this.obj.qgbz_left = this.getDetailCondition(_data.qgbz_left, 6);

                        this.obj.l_s = _data.l_s ? `${_data.l_s.toFixed(1)}D` : '';
                        this.obj.l_c = _data.l_c ? `${_data.l_c.toFixed(1)}D` : '';
                        this.obj.l_a = _data.l_a ? `${_data.l_a.toFixed(1)}°` : '';
                        this.obj.pd = _data.pd ? _data.pd.toFixed(1) : '';
                        this.obj.result_lcyx = (!_data.result_lcyx || _data.result_lcyx === 'null') ? '' : _data.result_lcyx;


                        // this.obj.r_refractive = _data.r_refractive == 0 ? '正常' : _data.r_refractive == 1 ? '近视' : _data.r_refractive == 2 ? '远视' : '其他';
                        // this.obj.l_refractive = _data.l_refractive == 0 ? '正常' : _data.l_refractive == 1 ? '近视' : _data.l_refractive == 2 ? '远视' : '其他';
                        this.obj.gonacratia = _data.gonacratia === 0 ? '已有' : _data.gonacratia === 2 ? '未有' : _data.gonacratia === 9 ? '不能回答' : '';
                        this.obj.menstruation = _data.menstruation === 0 ? '已有' : _data.menstruation === 2 ? '未有' : _data.menstruation === 9 ? '不能回答' : '';
                        //牙周
                        if (this.obj.periodontal != null) {
                            if (this.obj.periodontal === 1) {
                                this.obj.periodontal = '阴性';
                            } else if (this.obj.periodontal === 2) {
                                this.obj.periodontal = '牙龈炎';
                            } else if (this.obj.periodontal === 3) {
                                this.obj.periodontal = '牙石';
                            } else if (this.obj.periodontal === 4) {
                                this.obj.periodontal = '浅牙周袋';
                            } else if (this.obj.periodontal === 5) {
                                this.obj.periodontal = '深牙周袋';
                            } else {
                                this.obj.periodontal = '其他';
                            }
                        } else {
                            this.obj.periodontal = '正常';
                        }

                        // 口腔
                        this.obj.he_broken = this.obj.he_broken ? `恒牙${this.obj.he_broken}` : '';
                        this.obj.he_lose = this.obj.he_lose ? `恒牙${this.obj.he_lose}` : '';
                        this.obj.he_repair = this.obj.he_repair ? `恒牙${this.obj.he_repair}` : '';
                        this.obj.ru_broken = this.obj.ru_broken ? `乳牙${this.obj.ru_broken}` : '';
                        this.obj.ru_lose = this.obj.ru_lose ? `乳牙${this.obj.ru_lose}` : '';
                        this.obj.ru_repair = this.obj.ru_repair ? `乳牙${this.obj.ru_repair}` : '';

                        this.obj.recent_unwell = _data.recent_unwell;  // 近期不适症状


                        //心律
                        if (this.obj.cardiac_rhythm != null) {
                            if (this.obj.cardiac_rhythm === 1) {
                                this.obj.cardiac_rhythm = '齐';
                            } else if (this.obj.cardiac_rhythm === 2) {
                                this.obj.cardiac_rhythm = '不齐';
                            } else {
                                this.obj.cardiac_rhythm = '绝对不齐';
                            }
                        } else {
                            this.obj.cardiac_rhythm = '齐';
                        }
                        //肺部罗音
                        if (this.obj.lung_rale != null) {
                            if (this.obj.lung_rale === 1) {
                                this.obj.lung_rale = '无';
                            } else if (this.obj.lung_rale === 2) {
                                this.obj.lung_rale = '干';
                            } else if (this.obj.lung_rale === 3) {
                                this.obj.lung_rale = '湿';
                            }
                        } else {
                            this.obj.lung_rale = '无';
                        }
                    } else {
                        // this.obj = [];
                    }
                }).catch(err => {
                    // this.obj = [];
                });
            },
            // 分析参数取值
            getDetailCondition(argu, type) {
                if (type === 6) {//屈光不正
                    return this.qgCondition[argu] || '其他';
                }
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.getRetestInfo();
        }
    };
</script>
<style lang="less">
    .electronicReportInfo {
        .ivu-modal {
            min-width: 1100px;

            .ivu-modal-body {
                position: relative;
                padding: 20px 25px 10px 25px !important;
            }

            .sub-tip {
                position: absolute;
                bottom: -20px;
                right: 0;
                font-size: 14px;
                /*font-family: SourceHanSansCN-Regular;*/
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
            }

            .ivu-form {
                .ivu-row {
                    margin-bottom: 0 !important;
                }

                .ivu-input {
                    border-radius: 0;
                }

                .right-label .ivu-form-item-label {
                    text-align: right;
                }

                .ivu-form-item-label {
                    font-size: 14px;
                    /*font-family: SourceHanSansCN-Regular;*/
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1);
                }

                .first-label .ivu-form-item-label {
                    text-align: left;
                }

                .ivu-form-item {
                    margin-right: 0 !important;
                    margin-bottom: 10px !important;
                }
            }

            .reportInfos .ivu-form .ivu-form-item {
                margin-bottom: 20px !important;
            }

            .pad .ivu-form-item-label {
                padding: 2px 12px 0 0 !important;
            }

            .bodys {
                font-size: 16px;
                margin-bottom: 12px;
                /*font-family: SourceHanSansCN-Medium;*/
                font-weight: 600;
                color: rgba(0, 0, 0, 1);
            }

            .bodys:before {
                border-left: initial !important;
                height: 16px !important;
                content: "";
                padding-right: initial !important;
                display: inherit;
                float: left;
                margin-top: 8px;
            }


            .permanent {
                display: flex;

                .per-left {
                    > div {
                        display: flex;
                        align-items: stretch;
                        width: 180px;
                        padding-top: 10px;
                        line-height: 1.2;
                    }

                    .s1 {
                        width: 40px;
                        font-size: 14px;
                        /*font-family: SourceHanSansCN-Regular;*/
                        font-weight: 400;
                        color: rgba(126, 132, 133, 1);
                    }

                    .s2 {
                        width: 140px;
                    }
                }

                .per-right {
                    width: 380px;
                    display: flex;
                    padding-left: 10px;
                    flex-wrap: wrap;

                    .items {
                        width: 20px;
                        height: 34px;
                        margin: 0 2px 2px 0;
                        background: rgba(233, 240, 242, 1);
                        border: 1px solid rgba(221, 229, 231, 1);
                        text-align: center;
                    }
                }
            }

            .p-content {
                p {
                    font-size: 14px;
                    /*font-family: SourceHanSansCN-Regular;*/
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                    line-height: 20px;
                }
            }

            .idea {
                .squ {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: rgba(233, 240, 242, 1);
                    border: 1px solid rgba(221, 229, 231, 1);
                }

                .data {
                    margin-left: 14px;
                    position: relative;
                    top: -6px;
                }
            }

            /*}*/

            .ivu-modal-footer {
                border: none;
                padding: 0 38px 34px;
            }

            .ivu-select-disabled .ivu-select-selection,
            .ivu-input[disabled],
            fieldset[disabled] .ivu-input {
                color: #515a6e;
            }

            .close {
                width: 70px;
                height: 30px;
                font-size: 16px;
                /*font-family: SourceHanSansCN-Regular;*/
                font-weight: 400;
                color: rgba(128, 128, 128, 1);
                background: rgba(255, 255, 255, 0);
                border: 1px solid rgba(173, 173, 173, 1);
                border-radius: 4px;
                cursor: pointer;
            }

            .confirm {
                width: 70px;
                height: 30px;
                font-size: 16px;
                /*font-family: SourceHanSansCN-Regular;*/
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                background: rgba(255, 114, 0, 1);
                border-radius: 4px;
                border: none;
                cursor: pointer;
            }

            .ivu-tooltip {
                .ivu-tooltip-popper {
                    position: absolute;
                    right: 0 !important;
                    will-change: initial !important;
                    top: 31px;
                    left: initial !important;
                    display: block;

                    .ivu-tooltip-arrow {
                        border-bottom-color: rgba(70, 76, 91, .7) !important;
                    }

                    .ivu-tooltip-inner {
                        max-width: 450px !important;
                        background-color: rgba(70, 76, 91, .7) !important;
                        white-space: initial !important;
                    }

                }

                .ivu-input {
                    display: inline-block;
                    width: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }

        }

        input::-webkit-input-placeholder {
            /* placeholder颜色  */
            color: #000;
            /* placeholder字体大小  */
            font-size: 16px;
            font-weight: bold;
            text-align: center
        }

    }

    .label-pad .ivu-form-item-label {
        padding-right: 6px;
    }
</style>

