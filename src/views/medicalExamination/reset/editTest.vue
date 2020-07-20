<template>
    <div>
        <Modal
            :title="title1"
            :value="true"
            :width="1200"
            class="editTestss"
            :mask-closable="false"
            @on-cancel="close"
        >
            <div style="position: relative;margin-bottom:50px">
                <Form ref="obj" label-position="left" :model='obj' :rules="rules">
                    <Row>
                        <i-col span="6">
                            <FormItem class="first-label" label="学校名称" :label-width="80">
                                <i-input v-model="obj.dep_id" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="4">
                            <FormItem label="年级" class="right-label" :label-width="60" style="text-align: right;">
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
                            <FormItem label="证件号" class="right-label" :label-width="70">
                                <i-input v-model="obj.card_num" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="3">
                            <FormItem class="first-label" label="寄宿与否" :label-width="80">
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
                                <Tooltip :content="obj.anamnesis" style="width: 100%;" v-if='obj.anamnesis!=null'>
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
                                <Tooltip :content="obj.disability" style="width: 100%;" v-if='obj.anamnesis!=null'>
                                    <i-input v-model="obj.disability" :disabled="flag"></i-input>
                                </Tooltip>
                                <i-input v-model="obj.disability" :disabled="flag"
                                         v-else></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="60">
                        <i-col span="12">
                            <h4 class="bodys">
                                形体
                                <span class="abnormal" v-show="pd_abnormal(set_id,'8EE7B19DFAC74C7E898E983785800A0A')">异常</span>
                            </h4>
                            <Row :gutter="4" style="margin-bottom: 20px!important">
                                <i-col span="6">
                                    <FormItem class="first-label" label="身高(cm)" :label-width="90"
                                              prop="physicalExamRecords.height">
                                        <span slot="label">身高(cm)</span>
                                        <i-input
                                            number
                                            v-model="obj.physicalExamRecords.height"
                                            :maxlength="5"
                                            :disabled="!pd_abnormal(set_id,'8EE7B19DFAC74C7E898E983785800A0A')"
                                            @on-change="inputChange"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="7">
                                    <FormItem label="体重(kg)" class="right-label" :label-width="90"
                                              prop="physicalExamRecords.weight">
                                        <span slot="label">体重(kg)</span>
                                        <i-input
                                            number
                                            v-model="obj.physicalExamRecords.weight"
                                            :maxlength="5"
                                            :disabled="!pd_abnormal(set_id,'8EE7B19DFAC74C7E898E983785800A0A')"
                                            @on-change="inputChange"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="5">
                                    <FormItem class="first-label" label="BMI" :label-width="50">
                                        <span slot="label" style="display: block;text-align: right;">BMI</span>
                                        <i-input v-model="obj.physicalExamRecords.bmi"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem class="first-label pad" label="课桌椅型号" :label-width="60">
                                        <span slot="label" style="display: block;text-align: right;">课桌椅型号</span>
                                        <i-input v-model="obj.physicalExamRecords.desk_mat"
                                                 :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">
                                生理功能
                                <span class="abnormal"
                                      v-show="pd_abnormal(set_id,'8e185be85aa84a69894d33bc80aee4dc')">异常</span>
                            </h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <FormItem class="first-label pad" label="收缩压" :label-width="80"
                                              prop="physicalFunctions.sp">
                                        <span slot="label">收缩压(mmHg)</span>
                                        <i-input
                                            number
                                            v-model="obj.physicalFunctions.sp"
                                            :maxlength="3"
                                            :disabled="!pd_abnormal(set_id,'8e185be85aa84a69894d33bc80aee4dc')"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="舒张压(mmHg)" class="first-label pad" :label-width="80"
                                              prop="physicalFunctions.dp">
                                        <span slot="label">舒张压(mmHg)</span>
                                        <i-input
                                            number
                                            v-model="obj.physicalFunctions.dp"
                                            :maxlength="3"
                                            :disabled="!pd_abnormal(set_id,'8e185be85aa84a69894d33bc80aee4dc')"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="心率(次/分钟)" class="first-label pad" :label-width="80"
                                              prop="physicalFunctions.pulse">
                                        <span slot="label">心&emsp;率(次/分钟)</span>
                                        <i-input
                                            number
                                            v-model="obj.physicalFunctions.pulse"
                                            :maxlength="3"
                                            :disabled="!pd_abnormal(set_id,'8e185be85aa84a69894d33bc80aee4dc')"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">
                                眼科
                            </h4>
                            <Row :gutter="2">
                                <i-col span="6">
                                    <FormItem class="first-label" label="结膜" :label-width="60" prop="jiem">
                                        <span slot="label">结&nbsp;膜</span>
                                        <i-input v-model="obj.jiem" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="角膜" class="right-label" :label-width="70" prop="jiaom">
                                        <span slot="label">角&nbsp;膜</span>
                                        <i-input v-model="obj.jiaom" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="晶体" class="right-label" :label-width="70" prop="jt">
                                        <span slot="label">晶&nbsp;体</span>
                                        <i-input v-model="obj.jt" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="瞳孔" class="right-label" :label-width="70" prop="tk">
                                        <span slot="label">瞳&nbsp;孔</span>
                                        <i-input v-model="obj.tk" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="2">
                                <i-col span="6">
                                    <FormItem class="first-label" label="眼位" :label-width="60" prop="yw">
                                        <span slot="label">眼&nbsp;位</span>
                                        <i-input v-model="obj.yw" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="眼球运动" class="pad right-label" :label-width="70" prop="yqyd">
                                        <span slot="label">眼球运动&emsp;&emsp;</span>
                                        <i-input v-model="obj.yqyd" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="异常视觉行为" class="pad right-label" :label-width="70" prop="ycsjxw">
                                        <i-input v-model="obj.ycsjxw" :disabled="true"></i-input>
                                        <!--<i-select multiple v-model="obj.ycsjxw"-->
                                        <!--:disabled="!pd_abnormal(set_id,'a6efcc860d76449ab45de28bf128f769')">-->
                                        <!--<i-option value="未见异常">未见异常</i-option>-->
                                        <!--<i-option value="畏光">畏光</i-option>-->
                                        <!--<i-option value="眯眼">眯眼</i-option>-->
                                        <!--<i-option value="歪头">歪头</i-option>-->
                                        <!--<i-option value="其他">其他</i-option>-->
                                        <!--</i-select>-->
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="临床印象" :label-width="60" prop="lcyx">
                                        <span slot="label">临床印象</span>
                                        <i-input v-model="obj.lcyx" :disabled="true"></i-input>
                                        <!--<i-select multiple v-model="obj.lcyx"-->
                                        <!--:disabled="!pd_abnormal(set_id,'a6efcc860d76449ab45de28bf128f769')">-->
                                        <!--<i-option value="未见异常">未见异常</i-option>-->
                                        <!--<i-option value="斜视">斜视</i-option>-->
                                        <!--<i-option value="沙眼">沙眼</i-option>-->
                                        <!--<i-option value="结膜炎">结膜炎</i-option>-->
                                        <!--<i-option value="其他">其他</i-option>-->
                                        <!--</i-select>-->
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="2">
                                <i-col span="12">
                                    <FormItem class="pad" label="戴镜情况" :label-width="60" prop="dj">
                                        <span slot="label">戴镜情况</span>
                                        <i-input v-model="obj.dj" :disabled="true"></i-input>
                                        <!--<i-select v-model.trim="obj.dj"-->
                                        <!--:disabled="!pd_abnormal(set_id,'a6efcc860d76449ab45de28bf128f769')">-->
                                        <!--<i-option :value="1">不戴镜</i-option>-->
                                        <!--<i-option :value="2">佩戴框架眼镜</i-option>-->
                                        <!--<i-option :value="3">佩戴隐形眼镜</i-option>-->
                                        <!--<i-option :value="4">佩戴角膜塑形镜*</i-option>-->
                                        <!--</i-select>-->
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="右眼" class="right-label" :label-width="80" prop="dj_r">
                                        <span slot="label">右眼</span>
                                        <i-input number v-model.trim="obj.dj_r"
                                                 :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼" class="right-label" :label-width="80" prop="dj_l">
                                        <span slot="label">左眼</span>
                                        <i-input number v-model.trim="obj.dj_l"
                                                 :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="2">
                                <i-col span="12">
                                    <Row>
                                        <i-col span="24">
                                            <FormItem class="pad" label="屈光度右眼" :label-width="60" prop="r_s">
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">球镜(S)</span></span>
                                                <i-input number v-model.trim="obj.r_s"
                                                         :disabled="true"
                                                         style="width: 80px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem class="pad" label="" :label-width="60" prop="r_c">
                                                <span slot="label"></span>
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">柱镜(C)</span></span>
                                                <i-input number v-model.trim="obj.r_c"
                                                         :disabled="true"
                                                         style="width: 80px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem class="pad" label="" :label-width="60" prop="r_a">
                                                <span slot="label"></span>
                                                <span style="font-size:15px;">轴向值(A)</span>
                                                <i-input number v-model.trim="obj.r_a"
                                                         :disabled="true"
                                                         style="width: 130px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>
                                <i-col span="12">
                                    <Row>
                                        <i-col span="24">
                                            <FormItem label="屈光度左眼" class="pad right-label" :label-width="60"
                                                      prop="l_s">
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">球镜(S)</span></span>
                                                <i-input number v-model.trim="obj.l_s"
                                                         :disabled="true"
                                                         style="width: 80px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem label="" class="pad right-label" :label-width="60" prop="l_c">
                                                <span slot="label"></span>
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">柱镜(C)</span></span>
                                                <i-input number v-model.trim="obj.l_c"
                                                         :disabled="true"
                                                         style="width: 80px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem class="pad right-label" label="" :label-width="60" prop="l_a">
                                                <span slot="label"></span>
                                                <span style="font-size:15px;">轴向值(A)</span>
                                                <i-input number v-model.trim="obj.l_a"
                                                         :disabled="true"
                                                         style="width: 130px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>

                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="屈光临床印象" :label-width="80" prop="diolcyx">
                                        <i-input v-model="obj.diolcyx" :disabled="true"></i-input>
                                        <!--<i-select multiple v-model.trim="obj.diolcyx"-->
                                        <!--:disabled="!pd_abnormal(set_id,'a6efcc860d76449ab45de28bf128f769')">-->
                                        <!--<i-option value="未见异常">未见异常</i-option>-->
                                        <!--<i-option value="近视">近视</i-option>-->
                                        <!--<i-option value="远视">远视</i-option>-->
                                        <!--<i-option value="弱视">弱视</i-option>-->
                                        <!--<i-option value="散光">散光</i-option>-->
                                        <!--<i-option value="其他">其他</i-option>-->
                                        <!--</i-select>-->
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem class="pad" label="角膜曲率半径*" :label-width="80" prop="jmqlbj">
                                        <span slot="label" style="position:relative;">
                                            <span>角膜曲率半径</span>
                                            <span style="position: absolute;top: 10px;right: -38px;">*</span>
                                        </span>
                                        <i-input number v-model.trim="obj.jmqlbj"
                                                 :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="眼轴长度*" class="right-label" :label-width="80" prop="yzcd">
                                        <i-input number v-model.trim="obj.yzcd"
                                                 :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="色觉*" class="right-label" :label-width="70" prop="sj">
                                        <span slot="label">色&nbsp;觉*</span>
                                        <i-input v-model="obj.sj" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="随访*" :label-width="60" prop="sf">
                                        <i-input v-model.trim="obj.sf"
                                                 :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="转诊*" :label-width="60" prop="zz">
                                        <i-input v-model.trim="obj.zz"
                                                 :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">
                                视力<span style="font-size: 14px;">(按5.0计数法)</span>
                                <span class="abnormal"
                                      v-show="pd_abnormal(set_id,'3438ae5f1a8249c192c0e8abf1629210')">异常</span>
                            </h4>
                            <Row :gutter="16" class="bottom">
                                <i-col span="6">
                                    <FormItem class="pad right-label" label="右眼裸眼视力" :label-width="70"
                                              prop="eyesights.r_eyesight">
                                        <i-input v-model="obj.eyesights.r_eyesight" :maxlength="3"
                                                 :disabled="!pd_abnormal(set_id,'3438ae5f1a8249c192c0e8abf1629210')"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼裸眼视力" class="pad right-label" :label-width="70"
                                              prop="eyesights.l_eyesight">
                                        <i-input v-model="obj.eyesights.l_eyesight" :maxlength="3"
                                                 :disabled="!pd_abnormal(set_id,'3438ae5f1a8249c192c0e8abf1629210')"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="右眼戴镜视力" class="pad right-label" :label-width="70"
                                              prop="eyesights.r_bcva">
                                        <i-input v-model="obj.eyesights.r_bcva" :maxlength="3"
                                                 :disabled="!pd_abnormal(set_id,'3438ae5f1a8249c192c0e8abf1629210')"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼戴镜视力" class="pad right-label" :label-width="70"
                                              prop="eyesights.l_bcva">
                                        <i-input v-model="obj.eyesights.l_bcva" :maxlength="3"
                                                 :disabled="!pd_abnormal(set_id,'3438ae5f1a8249c192c0e8abf1629210')"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">口腔</h4>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem class="first-label" label="齿列" :label-width="60">
                                        <span slot="label">齿&emsp;列</span>
                                        <i-input v-model="obj.stomatologys.dentition"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="牙周" class="right-label" :label-width="60">
                                        <span slot="label">牙&emsp;周</span>
                                        <i-input v-model="obj.stomatologys.periodontal"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="有无龋齿" class="pad right-label" :label-width="60">
                                        <span slot="label">有无龋齿&emsp;&emsp;</span>
                                        <i-input v-model="obj.stomatologys.decayed_tooth"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <br>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="12">
                                    <FormItem label="龋患" class="" :label-width="60">
                                        <span slot="label">龋&emsp;患</span>
                                        <i-input v-model="obj.stomatologys.he_broken" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.stomatologys.ru_broken" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="龋失" class="" :label-width="60">
                                        <span slot="label">龋&emsp;失</span>
                                        <i-input v-model="obj.stomatologys.he_lose" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.stomatologys.ru_lose" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>

                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="12">
                                    <FormItem label="龋补" class="" :label-width="60">
                                        <span slot="label">龋&emsp;补</span>
                                        <i-input v-model="obj.stomatologys.he_repair" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.stomatologys.ru_repair" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="其他记录" class="dotted1 pad" :label-width="60">
                                        <i-input v-model="obj.stomatologys.remark"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">检验</h4>
                            <Row :gutter="16">
                                <i-col span="12">
                                    <FormItem class="pad first-label" label="谷丙转氨酶ALT(U/L)" :label-width="120">
                                        <i-input v-model="obj.clinicalLabs.alt"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="pad" label="总胆红素TBIL(g/L)" :label-width="130">
                                        <i-input v-model="obj.clinicalLabs.tbil"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="12">
                                    <FormItem class="pad first-label" label="血红蛋白(umol/L)" :label-width="135">
                                        <i-input v-model="obj.clinicalLabs.hemoglobin"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="其他化验结果" :label-width="110">
                                        <i-input v-model="obj.clinicalLabs.other_clinical"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">检查</h4>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="胸部X线检查" :label-width="100">
                                        <i-input v-model="obj.inspects.x_ray"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <!-- 升学体检 -->
                                <h4 class="bodys" v-if="obj.phy_type=='2'">结核菌素皮肤试验检查</h4>
                            <!--<Row :gutter="16" v-if="obj.phy_type=='2'">-->
                            <!--<i-col span="12">-->
                            <!--<FormItem label="注射时间" class="first-label" :label-width="86">-->
                            <!--<i-input number v-model.trim="obj.skinTests.inject_time"-->
                            <!--:disabled="true"></i-input>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--<i-col span="12">-->
                            <!--<FormItem label="硬结直径(横径X纵径)(mm)" prop="skinTests.dia" class="pad"-->
                            <!--:label-width="125">-->
                            <!--<i-input number v-model.trim="obj.skinTests.dia"-->
                            <!--:disabled="true"></i-input>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--</Row>-->
                            <!--<Row :gutter="16" v-if="obj.phy_type=='2'">-->
                            <!--<i-col span="12">-->
                            <!--<FormItem label="平均直径(mm)" :label-width="120">-->
                            <!--<i-input number v-model.trim="obj.skinTests.average_dia"-->
                            <!--:disabled="true"></i-input>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--<i-col span="12">-->
                            <!--<FormItem label="检验反应时间" :label-width="120" prop="skinTests.response_time">-->
                            <!--<i-input number v-model.trim="obj.skinTests.response_time"-->
                            <!--:disabled="true"></i-input>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--</Row>-->
                            <Row :gutter="16" v-if="obj.phy_type=='2'">
                                <!--<i-col span="12">-->
                                <!--<FormItem label="注射后局部情况" :label-width="130">-->
                                <!--<i-input v-model="obj.skinTests.condition" :disabled="flag"></i-input>-->
                                <!--</FormItem>-->
                                <!--</i-col>-->
                                <i-col span="24">
                                    <FormItem v-if="obj.examine === 1" label="结果判定" :label-width="80">
                                        <i-input v-model="obj.skinTests.result"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                    <FormItem v-else label="异常原因备注" class="pad" :label-width="80">
                                        <i-input v-model="obj.skinTests.result"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                    <!--<FormItem label="结果判定" :label-width="90">-->
                                    <!--<i-input v-model="obj.skinTests.result" :disabled="flag"></i-input>-->
                                    <!--</FormItem>-->
                                </i-col>
                            </Row>
                        </i-col>
                        <i-col span="12">
                            <h4 class="bodys">外科</h4>
                            <Row>
                                <i-col>
                                    <FormItem label="皮肤" :label-width="60">
                                        <i-input v-model="obj.surgerys.skin"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="淋巴结" :label-width="60">
                                        <i-input v-model="obj.surgerys.lymph"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="头部" :label-width="60">
                                        <i-input v-model="obj.surgerys.head"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="颈部" :label-width="60">
                                        <i-input v-model="obj.surgerys.neck"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="脊柱" :label-width="60">
                                        <i-input v-model="obj.surgerys.spine"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="四肢" :label-width="60">
                                        <i-input v-model="obj.surgerys.legs"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="胸部" :label-width="60">
                                        <i-input v-model="obj.surgerys.throax"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col>
                                    <FormItem label="其他记录*" class="pad" :label-width="60">
                                        <i-input v-model="obj.surgerys.other"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>

                            </Row>
                            <h4 class="bodys">内科</h4>
                            <Row>
                                <i-col>
                                    <FormItem class="pad" label="近期不适症状" :label-width="60">
                                        <i-input v-model="obj.internals.recent_unwell"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他症状" :label-width="60">
                                        <i-input v-model="obj.internals.other_unwell"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="心" :label-width="60">
                                        <span slot="label">心</span>
                                        <i-input v-model="obj.internals.heart"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>

                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="肺" :label-width="60">
                                        <span slot="label">肺&emsp;&emsp;</span>
                                        <i-input v-model="obj.internals.lung"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="肝" :label-width="60">
                                        <span slot="label">肝</span>
                                        <i-input v-model="obj.internals.liver" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="脾" :label-width="60">
                                        <span slot="label">脾</span>
                                        <i-input v-model="obj.internals.spleen" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他记录" :label-width="60">
                                        <i-input v-model="obj.internals.other_record"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <!-- 升学体检 -->
                            <h4 class="bodys" v-if="obj.phy_type=='2'">结核病筛查检查</h4>
                            <Row v-if="obj.phy_type=='2'" style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="确认有无卡介苗接种史或卡痕？" :label-width="230">
                                        <i-input v-model="obj.tuberculosiss.confirm"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="医生意见" :label-width="80">
                                        <i-input v-model="obj.tuberculosiss.doctor_result"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">需复查项目*</h4>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.mainInspects.retest_name"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">健康评价</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem :label-width="0">
                                        <i-input v-model="obj.mainInspects.health_assessment"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">本次体检结论</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input type="textarea" v-model="obj.mainInspects.main_result" :rows="6"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">健康指导</h4>
                            <FormItem :label-width="0" class="p-content">
                                <i-col span="24">
                                    <FormItem :label-width="0">
                                        <i-input type="textarea" v-model="obj.mainInspects.health_guide" :rows="6"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
                <!--                <span class="sub-tip">苏州市疾病预防控制中心</span>-->
            </div>
            <div slot="footer" style="padding-top: 10px;">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        name: 'editTest',
        props: ['plan_code', 'year', 'student_code', 'set_id', 'student_id', 'plan_id', 'title', 'flag'],
        data() {
            return {
                title1: this.title,
                obj: {                //个人体检详细信息
                    create_time: '',
                    dep_id: '',
                    grade_name: '',
                    class_name: '',
                    student_name: '',
                    gender: '',
                    anamnesis: '',
                    card_num: '',
                    past_medical: '',
                    friend_have: '',
                    have_touch: '',
                    other_symptoms: '',
                    main_symptoms: '',
                    phy_type: '',  //判断升学体检和入学体检
                    physicalExamRecords: { //形体
                        height: '',
                        weight: '',
                        bmi: '',
                        desk_mat: ''
                    },
                    eyesights: {         //视力
                        r_eyesight: '',
                        l_eyesight: '',
                        r_bcva: '',
                        l_bcva: '',
                    },
                    physicalFunctions: {  //生理功能
                        sp: '',
                        dp: '',
                        pulse: '',
                    },
                    surgerys: {           //外科
                        skin: '',
                        head: '',
                        neck: '',
                        spine: '',
                        lymph: '',
                        legs: '',
                        throax: '',
                        other: ''
                    },
                    clinicalLabs: {      //检验
                        alt: '',
                        tbil: '',
                        hemoglobin: '',
                        other_clinical: ''
                    },

                    stomatologys: {      //口腔科
                        dentition: '',
                        periodontal: '',
                        decayed_tooth: '',
                        he_broken: '',
                        he_lose: '',
                        he_repair: '',
                    },

                    internals: {       //内科
                        recent_unwell: '',
                        other_unwell: '',
                        heart_str: '',
                        lung_str: '',
                        liver_str: '',
                        spleen_str: '',
                        other_record: ''
                    },
                    skinTests: {        //皮肤测试检查
                        result: '',
                        inject_time: '',
                        dia: '',
                        average_dia: '',
                        condition: '',
                        response_time: '',
                    },
                    inspects: {        //检查科
                        x_ray: '',
                    },
                    jiem: null, //  结膜
                    jiaom: null, // 角膜 ,
                    jt: null,//晶体
                    tk: null,// 瞳孔 ,
                    yw: null,//眼位 ,
                    yqyd: null,//眼球运动 ,
                    ycsjxw: '',//异常视觉行为1无2畏光3眯眼4歪头 ,
                    dj: null, //戴镜情况 ,
                    dj_l: null,// 戴镜情况下左眼度数 ,
                    dj_r: null, // 戴镜情况下右眼度数

                    r_s: null,//右眼球镜s ,
                    r_c: null,// 右眼柱镜c ,
                    r_a: null,//右眼轴向值a ,
                    l_s: null, //左眼球镜s ,
                    l_c: null, // 左眼柱镜c ,
                    l_a: null, //左眼轴向值a

                    lcyx: '', //临床印象,
                    diolcyx: '',//屈光临床印象 ,
                    jmqlbj: null,// 角膜曲率半径 ,
                    yzcd: null,//眼轴长度 ,
                    sj: null,//色觉 ,
                    sf: null,//随访 ,
                    zz: null,//转诊
                    mainInspects: {     //主检
                        create_time: '',
                        health_assessment: '',
                        main_result: '',
                        retest_name: '',
                        health_guide: ''
                    },
                    tuberculosiss: {     //结核病筛查检查
                        doctor_result: '',
                        confirm: '',
                    }
                },
                rules1: {
                    'physicalExamRecords.height': [
                        {required: true, type: 'number', message: '请输入身高', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}(\.[0-9]{1})?$/, message: '身高必须为数字', trigger: 'blur'}],
                    'physicalExamRecords.weight': [
                        {required: true, type: 'number', message: '请输入体重', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}(\.[0-9]{1})?$/, message: '体重必须为数字', trigger: 'blur'}],
                },
                rules2: {
                    'physicalFunctions.dp': [
                        {required: true, type: 'number', message: '请输入舒张压', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}$/, message: '舒张压必须为整数', trigger: 'blur'}],
                    'physicalFunctions.pulse': [
                        {required: true, type: 'number', message: '请输入脉搏', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}$/, message: '脉搏次数必须为整数', trigger: 'blur'}],
                    'physicalFunctions.sp': [
                        {required: true, type: 'number', message: '请输入收缩压', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}$/, message: '收缩压必须为整数', trigger: 'blur'}],
                },
                rules3: {
                    'eyesights.l_eyesight': [
                        {required: true, message: '请输入右眼视力', trigger: 'blur'},
                        {pattern: /^[0-9]\.[0-9]$/, message: '必须为数字且保留一位小数点', trigger: 'blur'}],
                    'eyesights.l_bcva': [
                        {message: '请输入右眼矫正视力', trigger: 'blur'},
                        {pattern: /^[0-9]\.[0-9]$/, message: '必须为数字且保留一位小数点', trigger: 'blur'}],
                    'eyesights.r_eyesight': [
                        {required: true, message: '请输入左眼视力', trigger: 'blur'},
                        {pattern: /^[0-9]\.[0-9]$/, message: '必须为数字且保留一位小数点', trigger: 'blur'}],
                    'eyesights.r_bcva': [
                        {message: '请输入左眼矫正视力', trigger: 'blur'},
                        {pattern: /^[0-9]\.[0-9]$/, message: '必须为数字且保留一位小数点', trigger: 'blur'}],
                },
                rules4: {
                    'jiem': [
                        {required: true, type: 'number', message: '请选择', trigger: 'change'}
                    ],
                    'jiaom': [
                        {required: true, type: 'number', message: '请选择', trigger: 'change'}
                    ],
                    'jt': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'tk': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'yw': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'yqyd': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'ycsjxw': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'lcyx': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'dj': [{required: true, type: 'number', message: '请选择', trigger: 'blur'}],
                    'dj_r': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'dj_l': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'r_s': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'r_a': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'r_c': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'l_s': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'l_a': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'l_c': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'diolcyx': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'jmqlbj': [{required: true, type: 'number', message: '请输入', trigger: 'blur'},
                        {pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'yzcd': [{required: true, type: 'number', message: '请输入', trigger: 'blur'},
                        {pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'sj': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'sf': [{required: true, message: '请输入', trigger: 'blur'}],
                    'zz': [{required: true, message: '请输入', trigger: 'blur'}],
                },
                rules: {}
            };
        },
        methods: {

            // 判断数据是否异常函数
            pd_abnormal(set_id, yc) {
                if ('a6efcc860d76449ab45de28bf128f769' === yc) {
                    return false;
                }
                let set_id_array = this.set_id.split(',');
                return set_id_array.includes(yc);
            },
            inputChange() {
                let height = this.obj.physicalExamRecords.height / 100;
                this.obj.physicalExamRecords.bmi = (this.obj.physicalExamRecords.weight / (height * height)).toFixed(2);
            },
            //复测个人信息详情
            getRetestInfo() {
                this.$ajax({
                    url: urls.retest_single_info,
                    data: {
                        student_id: this.student_id,
                        type: 2
                    }
                }).then(data => {
                    if (data.code === 200) {

                        let _data = data.data;

                        this.obj.dep_id = _data.dep_id;
                        this.obj.grade_name = _data.grade_name;
                        this.obj.class_name = _data.class_name;
                        this.obj.is_boarding = _data.is_boarding === 1 ? '是' : '否';
                        this.obj.nation = _data.nation ? _data.nation : '汉';
                        this.obj.student_name = _data.student_name;
                        this.obj.card_num = _data.card_num;
                        // this.obj.other_symptoms = _data.other_symptoms;
                        // this.obj.main_symptoms = _data.main_symptoms;
                        this.obj.phy_type = _data.phy_type;
                        if (_data.phy_type == '1') {
                            this.title1 = '学生健康体检报告核实';
                        } else {
                            this.title1 = '学生升学体检报告核实';
                        }

                        this.obj.disability = _data.disability ? _data.disability : '无';

                        //既往病史
                        if (_data.anamnesis != null) {
                            this.obj.anamnesis = _data.anamnesis;
                        } else {
                            this.obj.anamnesis = '无';
                        }


                        if (_data.gender != null) {
                            this.obj.gender = _data.gender === 1 ? '男' : '女';
                        }

                        //形体
                        if (_data.physicalExamRecords && _data.physicalExamRecords.length > 0) {

                            this.obj.physicalExamRecords.height = _data.physicalExamRecords[0].height;
                            this.obj.physicalExamRecords.weight = _data.physicalExamRecords[0].weight;
                            this.obj.physicalExamRecords.bmi = _data.physicalExamRecords[0].bmi;
                            this.obj.physicalExamRecords.desk_mat = _data.desk_mat;
                        }
                        //生理功能
                        if (_data.physicalFunctions && _data.physicalFunctions.length > 0) {
                            this.obj.physicalFunctions.sp = _data.physicalFunctions[0].sp;
                            this.obj.physicalFunctions.dp = _data.physicalFunctions[0].dp;
                            this.obj.physicalFunctions.pulse = _data.physicalFunctions[0].pulse;
                        }

                        //外科
                        if (_data.surgerys && _data.surgerys.length > 0) {
                            let {
                                skin,
                                skin_str, head, head_str, neck, neck_str,
                                spine, spine_str, lymph, lymph_str, legs, legs_str, throax, throax_str, other
                            } = _data.surgerys[0];       //外科
                            if (skin == 1) {
                                this.obj.surgerys.skin = '正常';
                            } else {
                                this.obj.surgerys.skin = skin_str;
                            }
                            if (head == 1) {
                                this.obj.surgerys.head = '正常';
                            } else {
                                this.obj.surgerys.head = head_str;
                            }
                            if (neck == 1) {
                                this.obj.surgerys.neck = '正常';
                            } else {
                                this.obj.surgerys.neck = neck_str;
                            }
                            if (spine == 1) {
                                this.obj.surgerys.spine = '正常';
                            } else {
                                this.obj.surgerys.spine = spine_str;
                            }
                            if (lymph == 1) {
                                this.obj.surgerys.lymph = '未触及';
                            } else {
                                this.obj.surgerys.lymph = lymph_str;
                            }
                            if (legs == 1) {
                                this.obj.surgerys.legs = '正常';
                            } else {
                                this.obj.surgerys.legs = legs_str;
                            }
                            if (throax == 1) {
                                this.obj.surgerys.throax = '正常';
                            } else {
                                this.obj.surgerys.throax = throax_str;
                            }
                            // this.obj.surgerys.skin = skin_str;
                            // this.obj.surgerys.head = head_str;
                            // this.obj.surgerys.neck = neck_str;
                            // this.obj.surgerys.spine = spine_str;
                            // this.obj.surgerys.lymph = lymph_str;
                            // this.obj.surgerys.legs = legs_str;
                            // this.obj.surgerys.throax = throax_str;
                            this.obj.surgerys.other = other ? other : '无';
                        }

                        //结核病筛查检查
                        if (_data.tuberculosiss && _data.tuberculosiss.length > 0) {
                            if (_data.tuberculosiss[0].confirm != null) {
                                this.obj.tuberculosiss.confirm = _data.tuberculosiss[0].confirm === 1 ? '有' : '无';
                            }
                            if (_data.tuberculosiss[0].doctor_result != null) {
                                let arr = [];
                                let t_arr = String(_data.tuberculosiss[0].doctor_result).split('');
                                t_arr.forEach(item => {
                                    switch (item) {
                                        case '1':
                                            arr.push('是肺结核可疑症状者');
                                            break;
                                        case '2':
                                            arr.push('是肺结核密切接触者');
                                            break;
                                        case '3':
                                            arr.push('不是肺结核可疑症状者');
                                            break;
                                        case '4':
                                            arr.push('不是肺结核密切接触者');
                                            break;
                                    }
                                });
                                this.obj.tuberculosiss.doctor_result = arr.join();
                            }
                        }
                        //检验科
                        if (_data.clinicalLabs && _data.clinicalLabs.length > 0) {
                            const clinicalLabs = _data.clinicalLabs[0];
                            this.obj.clinicalLabs.alt = clinicalLabs.alt;
                            this.obj.clinicalLabs.tbil = clinicalLabs.tbil;
                            this.obj.clinicalLabs.hemoglobin = clinicalLabs.hemoglobin;
                            this.obj.clinicalLabs.other_clinical = clinicalLabs.other_clinical ? clinicalLabs.other_clinical : '无';
                        }

                        //皮肤测试检查
                        if (_data.skinTests && _data.skinTests.length > 0) {
                            const skinTests = _data.skinTests[0];
                            this.obj.skinTests.inject_time = skinTests.inject_time;
                            this.obj.skinTests.response_time = skinTests.response_time;
                            this.obj.skinTests.dia = skinTests.dia;
                            this.obj.skinTests.average_dia = skinTests.average_dia;
                            // this.obj.skinTests.result = skinTests.result;
                            // this.obj.skinTests.condition = skinTests.condition;

                            this.obj.examine = skinTests.examine;
                            if (_data.skinTests[0].examine === 1) {//正常检查
                                //结核菌素试验
                                if (skinTests.result != null) {
                                    if (skinTests.result === 1) {
                                        this.obj.skinTests.result = '阴性';
                                    } else if (skinTests.result === 2) {
                                        this.obj.skinTests.result = '一般阳性';
                                    } else if (skinTests.result === 3) {
                                        this.obj.skinTests.result = '中度阳性';
                                    } else if (skinTests.result === 4) {
                                        this.obj.skinTests.result = '强阳性';
                                    }
                                }
                            } else if (_data.skinTests[0].examine === 2) {//异常不检查
                                this.obj.skinTests.result = _data.skinTests[0].remark;
                            } else {
                                this.obj.skinTests.result = '无';
                            }


                            //注射后局部情况
                            if (skinTests.condition != null) {
                                if (skinTests.condition === 0) {
                                    this.obj.skinTests.condition = '正常';
                                } else if (skinTests.condition === 1) {
                                    this.obj.skinTests.condition = '水疱';
                                } else if (skinTests.condition === 2) {
                                    this.obj.skinTests.condition = '溃疡';
                                } else if (skinTests.condition === 3) {
                                    this.obj.skinTests.condition = '坏死';
                                } else {
                                    this.obj.skinTests.condition = '淋巴管炎';
                                }
                            }
                        }

                        //眼科

                        if (_data.newophthalmologys && _data.newophthalmologys.length > 0) {
                            const newophthalmologys = _data.newophthalmologys[0];
                            let obj1 = {
                                0: '异常',
                                1: '正常',
                                2: '异常'
                            };
                            //结膜
                            this.obj.jiem = obj1[newophthalmologys.jiem];
                            this.obj.jt = obj1[newophthalmologys.jt];
                            this.obj.yw = obj1[newophthalmologys.yw];
                            this.obj.jiaom = obj1[newophthalmologys.jiaom];
                            this.obj.tk = obj1[newophthalmologys.tk];
                            this.obj.yqyd = obj1[newophthalmologys.yqyd];
                            this.obj.sj = obj1[newophthalmologys.sj];

                            this.obj.ycsjxw = newophthalmologys.ycsjxw;

                            this.obj.lcyx = newophthalmologys.lcyx;
                            this.obj.diolcyx = newophthalmologys.diolcyx;

                            this.obj.sf = newophthalmologys.sf;
                            this.obj.zz = newophthalmologys.zz;

                            let djObj = {
                                1: '不戴镜',
                                2: '佩戴框架眼镜',
                                3: '佩戴隐形眼镜',
                                4: '佩戴角膜塑形镜'
                            };
                            this.obj.dj = djObj[newophthalmologys.dj];
                            this.obj.dj_r = newophthalmologys.dj_r ? newophthalmologys.dj_r + 'D' : '';
                            this.obj.dj_l = newophthalmologys.dj_l ? newophthalmologys.dj_l + 'D' : '';
                            this.obj.jmqlbj = newophthalmologys.jmqlbj ? newophthalmologys.jmqlbj + 'mm' : '';
                            this.obj.yzcd = newophthalmologys.yzcd ? newophthalmologys.yzcd + 'mm' : '';

                            this.obj.r_a = newophthalmologys.r_a ? newophthalmologys.r_a + '°' : '';
                            this.obj.l_a = newophthalmologys.l_a ? newophthalmologys.l_a + '°' : '';
                            this.obj.r_s = newophthalmologys.r_s ? newophthalmologys.r_s + 'D' : '';
                            this.obj.l_s = newophthalmologys.l_s ? newophthalmologys.l_s + 'D' : '';
                            this.obj.r_c = newophthalmologys.r_c ? newophthalmologys.r_c + 'D' : '';
                            this.obj.l_c = newophthalmologys.l_c ? newophthalmologys.l_c + 'D' : '';
                        }
                        //视力
                        if (_data.eyesights && _data.eyesights.length > 0) {
                            const eyesights = _data.eyesights[0];
                            this.obj.eyesights.r_eyesight = eyesights.r_eyesight ? eyesights.r_eyesight.toFixed(1) : '';
                            this.obj.eyesights.l_eyesight = eyesights.l_eyesight ? eyesights.l_eyesight.toFixed(1) : '';
                            this.obj.eyesights.r_bcva = eyesights.r_bcva ? eyesights.r_bcva.toFixed(1) : '';
                            this.obj.eyesights.l_bcva = eyesights.l_bcva ? eyesights.l_bcva.toFixed(1) : '';
                        }

                        //口腔科
                        if (_data.stomatologys && _data.stomatologys.length > 0) {
                            const stomatologys = _data.stomatologys[0];

                            this.obj.stomatologys.he_broken = stomatologys.he_broken || stomatologys.he_broken === 0 ? `恒牙${stomatologys.he_broken}` : '';
                            this.obj.stomatologys.he_lose = stomatologys.he_lose || stomatologys.he_lose === 0 ? `恒牙${stomatologys.he_lose}` : '';
                            this.obj.stomatologys.he_repair = stomatologys.he_repair || stomatologys.he_repair === 0 ? `恒牙${stomatologys.he_repair}` : '';
                            this.obj.stomatologys.ru_broken = stomatologys.ru_broken || stomatologys.ru_broken === 0 ? `乳牙${stomatologys.ru_broken}` : '';
                            this.obj.stomatologys.ru_lose = stomatologys.ru_lose || stomatologys.ru_lose === 0 ? `乳牙${stomatologys.ru_lose}` : '';
                            this.obj.stomatologys.ru_repair = stomatologys.ru_repair || stomatologys.ru_repair === 0 ? `乳牙${stomatologys.ru_repair}` : '';

                            if (stomatologys.dentition != null) {
                                this.obj.stomatologys.dentition = stomatologys.dentition === 1 ? '整齐' : '不齐';
                            }
                            if (stomatologys.decayed_tooth != null) {
                                this.obj.stomatologys.decayed_tooth = stomatologys.decayed_tooth === 1 ? '无' : '有';
                            }
                            //牙周
                            if (stomatologys.periodontal != null) {
                                this.obj.stomatologys.periodontal = stomatologys.periodontal === 1 ? '正常' : '异常';
                            }

                            this.obj.stomatologys.remark = stomatologys.remark ? stomatologys.remark : '无';


                        }

                        //内科
                        if (_data.internals && _data.internals.length > 0) {
                            let {
                                recent_unwell, other_unwell, heart, heart_str, lung_str, lung, liver, liver_str, spleen,
                                spleen_str, other_record
                            } = _data.internals[0];
                            if (heart == 1) {
                                this.obj.internals.heart = '正常';
                            } else {
                                this.obj.internals.heart = heart_str;
                            }
                            if (lung == 1) {
                                this.obj.internals.lung = '正常';
                            } else {
                                this.obj.internals.lung = lung_str;
                            }
                            if (liver == 1) {
                                this.obj.internals.liver = '正常';
                            } else {
                                this.obj.internals.liver = liver_str;
                            }
                            if (spleen == 1) {
                                this.obj.internals.spleen = '正常';
                            } else {
                                this.obj.internals.spleen = spleen_str;
                            }
                            // this.obj.internals.heart = heart_str;
                            // this.obj.internals.lung = lung_str;
                            // this.obj.internals.liver = liver_str;
                            // this.obj.internals.spleen = spleen_str;
                            this.obj.internals.recent_unwell = recent_unwell ? recent_unwell : '无';
                            this.obj.internals.other_record = other_record ? other_record : '无';
                            this.obj.internals.other_unwell = other_unwell ? other_unwell : '无';

                        }

                        //主检
                        if (_data.mainInspects && _data.mainInspects.length > 0) {
                            let mainInspects = _data.mainInspects[0];
                            // this.obj.mainInspects.health_assessment = mainInspects.health_assessment;
                            this.obj.create_time = mainInspects.create_time;
                            this.obj.mainInspects.main_result = mainInspects.main_result ? mainInspects.main_result.replace(/<br>/g, '\n') : '';
                            this.obj.mainInspects.retest_name = mainInspects.retest_name;
                            this.obj.mainInspects.health_guide = mainInspects.health_guide;


                            if (mainInspects.health_assessment != null) {
                                if (mainInspects.health_assessment === 1) {
                                    this.obj.mainInspects.health_assessment = '健康良好';
                                } else if (mainInspects.health_assessment === 2) {
                                    this.obj.mainInspects.health_assessment = '患有疾病';
                                } else {
                                    this.obj.mainInspects.health_assessment = '身体残疾';
                                }
                            }
                        }

                        //检查科
                        if (_data.inspects && _data.inspects.length > 0) {
                            if (_data.inspects[0].x_ray != null) {
                                this.obj.inspects.x_ray = _data.inspects[0].x_ray === 1 ? '未见异常' : '异常' + ' (' + _data.inspects[0].description + ' )';
                            }
                        }
                    }
                }).catch(err => {

                });
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data = {
                        // 必填字段
                        student_id: this.student_id,
                        plan_id: this.plan_id,
                        plan_code: this.plan_code,
                        student_code: this.student_code,
                        year: this.year,
                        // 形体
                        height_sid: '8EE7B19DFAC74C7E898E983785800A0A' || null,
                        height: Number(this.obj.physicalExamRecords.height),  //input默认string类型,需转换成number ,否则获取不到值，输入框有值提示报错
                        weight: Number(this.obj.physicalExamRecords.weight),
                        desk_mat: this.obj.physicalExamRecords.desk_mat,
                        // 生理功能
                        blood_sid: '8e185be85aa84a69894d33bc80aee4dc' || null,
                        dp: Number(this.obj.physicalFunctions.dp),
                        pulse: Number(this.obj.physicalFunctions.pulse),
                        sp: Number(this.obj.physicalFunctions.sp),
                        // 视力
                        eyes_sid: '3438ae5f1a8249c192c0e8abf1629210' || null,
                        l_eyesight: Number(this.obj.eyesights.l_eyesight),
                        l_bcva: this.obj.eyesights.l_bcva ? Number(this.obj.eyesights.l_bcva) : null,
                        r_eyesight: Number(this.obj.eyesights.r_eyesight),
                        r_bcva: this.obj.eyesights.r_bcva ? Number(this.obj.eyesights.r_bcva) : null,

                        // 眼科
                        // ophthal_sid : 'a6efcc860d76449ab45de28bf128f769' || null,
                        // jiem: jiem, //  结膜
                        // jiaom: jiaom, // 角膜 ,
                        // jt: jt,//晶体
                        // tk: tk,// 瞳孔 ,
                        // yw: yw,//眼位 ,
                        // yqyd: yqyd,//眼球运动 ,
                        // ycsjxw: ycsjxw.join(),//异常视觉行为1无2畏光3眯眼4歪头 ,
                        // dj: dj, //戴镜情况 ,
                        // dj_l: dj_l,// 戴镜情况下左眼度数 ,
                        // dj_r: dj_r, // 戴镜情况下右眼度数
                        //
                        // r_s: r_s,//右眼球镜s ,
                        // r_c: r_c,// 右眼柱镜c ,
                        // r_a: r_a,//右眼轴向值a ,
                        // l_s: l_s, //左眼球镜s ,
                        // l_c: l_c, // 左眼柱镜c ,
                        // l_a: l_a, //左眼轴向值a
                        //
                        // lcyx: lcyx.join(), //临床印象,
                        // diolcyx: diolcyx.join(),//屈光临床印象 ,
                        // jmqlbj: jmqlbj,// 角膜曲率半径 ,
                        // yzcd: yzcd,//眼轴长度 ,
                        // sj: sj,//色觉 ,
                        // sf: sf,//随访 ,
                        // zz: zz,//转诊
                    };

                    if (this.plan_code && this.year && this.student_code) { // 编辑'

                        this.$ajax({
                            url: urls.retest_edit,
                            data: data,
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('核实成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(data.msg);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            let arr = this.set_id ? this.set_id.split(',') : [];
            let obj = {};
            if (arr.length) {
                arr.forEach(item => {
                    switch (item) {
                        case '8EE7B19DFAC74C7E898E983785800A0A':
                            obj = {...obj, ...this.rules1};
                            return;
                        case '8e185be85aa84a69894d33bc80aee4dc':
                            obj = {...obj, ...this.rules2};
                            return;
                        // case 'a6efcc860d76449ab45de28bf128f769':
                        //     obj = {...obj, ...this.rules4};
                        //     return;
                        case '3438ae5f1a8249c192c0e8abf1629210':
                            obj = {...obj, ...this.rules3};
                            return;
                        default:
                            return;
                    }
                });
            }
            this.rules = obj;
            this.getRetestInfo();
        }
    };
</script>
<style lang="less">
    .editTestss {
        .ivu-modal {
            min-width: 1100px;

            .ivu-select-selection {
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
            }

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

            .ivu-form {
                .ivu-input {
                    border-radius: 0;
                }

                .ivu-row {
                    margin-bottom: 0 !important;
                }

                .right-label .ivu-form-item-label {
                    text-align: right;
                }

                .ivu-form-item-label {
                    padding-top: 8px !important;
                    padding-bottom: 9px !important;
                    font-size: 14px;
                    /*font-family: SourceHanSansCN-Regular;*/
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1);
                }

                .bottom .ivu-form-item {
                    margin-right: 0 !important;
                    margin-bottom: 30px !important;
                }
            }

            .pad .ivu-form-item-label {
                padding: 2px 12px 0 0 !important;
            }

            .bodys {
                font-size: 20px;
                margin-bottom: 12px;
                font-family: SourceHanSansCN-Medium;
                font-weight: 500;
                color: rgba(0, 0, 0, 1);

                .abnormal {
                    font-size: 12px;
                    width: 50px;
                    height: 19px;
                    border-radius: 10px;
                    color: #fff;
                    background: #ff7b10;
                    display: inline-block;
                    text-align: center;
                    margin-left: 5px;
                }
            }

            .bodys:before {
                border-left: 4px solid #ff7b10;
                height: 16px !important;
                content: "";
                padding-right: 10px;
                display: inherit;
                float: left;
                margin-top: 8px;
            }

            .p-content {
                p {
                    font-size: 14px;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                    line-height: 20px;
                }
            }

            .ivu-modal-footer {
                border: none;
                padding: 0 38px 34px;
            }

            .close {
                width: 70px;
                height: 30px;
                font-size: 16px;
                font-family: SourceHanSansCN-Regular;
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
                font-family: SourceHanSansCN-Regular;
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
    }
</style>
