<template>
    <div>
        <Modal
            :title="title1"
            :value="true"
            :width="1200"
            class="editFollow"
            :mask-closable="false"
            @on-cancel="close"
        >
            <div style="position:relative;padding-bottom:50px">
                <Form ref="obj" label-position="left" :model='obj'>
                    <Row :gutter="16">
                        <i-col span="6">
                            <FormItem class="first-label" label="学校名称" :label-width="80">
                                <i-input v-model.trim="obj.dep_id" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="4">
                            <FormItem label="年级" :label-width="50">
                                <i-input v-model.trim="obj.grade_name" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="班级" :label-width="50">
                                <i-input v-model.trim="obj.class_name" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="姓名" :label-width="50">
                                <i-input v-model.trim="obj.student_name" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="性别" :label-width="50">
                                <i-input v-model.trim="obj.gender" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="5">
                            <FormItem label="证件号" :label-width="65">
                                <i-input v-model.trim="obj.card_num" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="16">
                        <i-col span="3">
                            <FormItem label="寄宿与否" :label-width="80">
                                <i-input v-model.trim="obj.is_boarding" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="民族" :label-width="50">
                                <i-input v-model.trim="obj.nation" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="18">
                            <FormItem label="既往病史" :label-width="80">
                                <Tooltip :content="obj.anamnesis" v-if='obj.anamnesis' style="width: 100%;">
                                    <i-input v-model.trim="obj.anamnesis" :disabled="true"></i-input>
                                </Tooltip>
                                <i-input v-model.trim="obj.anamnesis" v-else :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="16" style="margin-bottom: 20px!important">
                        <i-col span="6">
                            <FormItem class="first-label" label="体检日期" :label-width="80">
                                <i-input v-model.trim="obj.create_time" :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="18">
                            <FormItem label="残疾情况" :label-width="80">
                                <Tooltip :content="obj.disability" v-if='obj.disability' style="width: 100%;">
                                    <i-input v-model.trim="obj.disability" :disabled="true"></i-input>
                                </Tooltip>
                                <i-input v-model.trim="obj.disability" v-else :disabled="true"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="60">
                        <i-col span="12">
                            <h4 class="bodys">
                                一般
                                <!--<span class="abnormal" v-show="pd_abnormal(set_id,'8EE7B19DFAC74C7E898E983785800A0A')">异常</span>-->
                            </h4>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="7">
                                    <FormItem class="first-label" label="身 高(cm)" :label-width="90"
                                              prop="physicalExamRecords.height">
                                        <span slot="label">身高(cm)</span>
                                        <i-input
                                            number
                                            v-model.trim="obj.physicalExamRecords.height"
                                            :maxlength="5"
                                            :disabled="disabled"
                                            @on-change="inputChange"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="体重(kg)" class="right-label" :label-width="90"
                                              prop="physicalExamRecords.weight">
                                        <span slot="label">体重(kg)</span>
                                        <i-input
                                            number
                                            v-model.trim="obj.physicalExamRecords.weight"
                                            :maxlength="5"
                                            :disabled="disabled"
                                            @on-change="inputChange"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="5">
                                    <FormItem class="first-label" label="BMI" :label-width="50">
                                        <span slot="label" style="display: block;text-align: right;">BMI</span>
                                        <i-input v-model.trim="obj.physicalExamRecords.bmi" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem class="pad right-label" label="课桌椅型号" :label-width="70"
                                              prop="physicalExamRecords.desk_mat">
                                        <span slot="label">课桌椅型号&emsp;</span>
                                        <i-input v-model="obj.physicalExamRecords.desk_mat"
                                                 :disabled="disabled"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">
                                生理功能
                                <!--<span class="abnormal"-->
                                <!--v-show="pd_abnormal(set_id,'8e185be85aa84a69894d33bc80aee4dc')">异常</span>-->
                            </h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <FormItem class="first-label pad" label="收缩压(mmHg)" :label-width="80"
                                              prop="physicalFunctions.sp">
                                        <span slot="label">收缩压(mmHg)</span>
                                        <i-input
                                            number
                                            v-model.trim="obj.physicalFunctions.sp"
                                            :disabled="disabled"
                                            :maxlength="3"
                                        ></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="舒张压(mmHg)" class="first-label pad" :label-width="80"
                                              prop="physicalFunctions.dp">
                                        <span slot="label">舒张压(mmHg)</span>
                                        <i-input
                                            number
                                            v-model.trim="obj.physicalFunctions.dp"
                                            :disabled="disabled"
                                            :maxlength="3"
                                        ></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="心率(次/分钟)" class="first-label pad" :label-width="80"
                                              prop="physicalFunctions.pulse">
                                        <span slot="label">心&emsp;率(次/分钟)</span>
                                        <i-input
                                            number
                                            v-model.trim="obj.physicalFunctions.pulse"
                                            :disabled="disabled"
                                            :maxlength="3"
                                        ></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">
                                眼科
                                <!--<span class="abnormal"-->
                                <!--v-show="pd_abnormal(set_id,'a6efcc860d76449ab45de28bf128f769')">异常</span>-->
                            </h4>
                            <Row :gutter="2">
                                <i-col span="6">
                                    <FormItem class="first-label" label="结膜" :label-width="60" prop="jiem">
                                        <span slot="label">结&nbsp;膜</span>
                                        <i-select v-model.trim="obj.jiem" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="0">异常</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="角膜" class="right-label" :label-width="70" prop="jiaom">
                                        <span slot="label">角&nbsp;膜</span>
                                        <i-select v-model.trim="obj.jiaom" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="0">异常</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="晶体" class="right-label" :label-width="70" prop="jt">
                                        <span slot="label">晶&nbsp;体</span>
                                        <i-select v-model.trim="obj.jt" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="0">异常</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="瞳孔" class="right-label" :label-width="70" prop="tk">
                                        <span slot="label">瞳&nbsp;孔</span>
                                        <i-select v-model.trim="obj.tk" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="0">异常</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="2">
                                <i-col span="6">
                                    <FormItem class="first-label" label="眼位" :label-width="60" prop="yw">
                                        <span slot="label">眼&nbsp;位</span>
                                        <i-select v-model.trim="obj.yw" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="0">异常</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="眼球运动" class="pad right-label" :label-width="70" prop="yqyd">
                                        <span slot="label">眼球运动&emsp;&emsp;</span>
                                        <i-select v-model.trim="obj.yqyd" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="0">异常</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="异常视觉行为" class="pad right-label" :label-width="70" prop="ycsjxw">
                                        <i-select multiple v-model="obj.ycsjxw" :disabled="disabled">
                                            <i-option value="未见异常">未见异常</i-option>
                                            <i-option value="畏光">畏光</i-option>
                                            <i-option value="眯眼">眯眼</i-option>
                                            <i-option value="歪头">歪头</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="临床印象" :label-width="60" prop="lcyx">
                                        <span slot="label">临床印象</span>
                                        <i-select multiple v-model="obj.lcyx" :disabled="disabled">
                                            <i-option value="未见异常">未见异常</i-option>
                                            <i-option value="斜视">斜视</i-option>
                                            <i-option value="沙眼">沙眼</i-option>
                                            <i-option value="结膜炎">结膜炎</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="2">
                                <i-col span="12">
                                    <FormItem class="pad" label="戴镜情况" :label-width="60" prop="dj">
                                        <span slot="label">戴镜情况</span>
                                        <i-select v-model.trim="obj.dj" :disabled="disabled" @on-change="djChange">
                                            <i-option :value="1">不戴镜</i-option>
                                            <i-option :value="2">佩戴框架眼镜</i-option>
                                            <i-option :value="3">佩戴隐形眼镜</i-option>
                                            <i-option :value="4">佩戴角膜塑形镜*</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="右眼" class="right-label pad" :label-width="60" prop="dj_r">
                                        <span slot="label">右眼(D)</span>
                                        <i-input number v-model.trim="obj.dj_r" :disabled="disabled || this.obj.dj!==4"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼" class="right-label pad" :label-width="60" prop="dj_l">
                                        <span slot="label">左眼(D)</span>
                                        <i-input number v-model.trim="obj.dj_l" :disabled="disabled || this.obj.dj!==4"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="2">
                                <i-col span="12">
                                    <Row>
                                        <i-col span="24">
                                            <FormItem class="pad" label="屈光度右眼" :label-width="60" prop="r_s">
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">球镜(S)(D)</span></span>
                                                <i-input number v-model.trim="obj.r_s" :maxlength="4"
                                                         :disabled="disabled"
                                                         style="width: 60px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem class="pad" label="" :label-width="60" prop="r_c">
                                                <span slot="label"></span>
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">柱镜(C)(D)</span></span>
                                                <i-input number v-model.trim="obj.r_c" :maxlength="4"
                                                         :disabled="disabled"
                                                         style="width: 60px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem class="pad" label="" :label-width="60" prop="r_a">
                                                <span slot="label"></span>
                                                <span style="font-size:15px;">轴向值(A)(°)</span>
                                                <i-input number v-model.trim="obj.r_a" :maxlength="4"
                                                         :disabled="disabled"
                                                         style="width: 110px;position: absolute;right: 0;"
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
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">球镜(S)(D)</span></span>
                                                <i-input number v-model.trim="obj.l_s" :maxlength="4"
                                                         :disabled="disabled"
                                                         style="width: 60px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem label="" class="pad right-label" :label-width="60" prop="l_c">
                                                <span slot="label"></span>
                                                <span style="font-size:16px;">①+②-③0  <span style="font-size:12px;">柱镜(C)(D)</span></span>
                                                <i-input number v-model.trim="obj.l_c" :maxlength="4"
                                                         :disabled="disabled"
                                                         style="width: 60px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="24">
                                            <FormItem class="pad right-label" label="" :label-width="60" prop="l_a">
                                                <span slot="label"></span>
                                                <span style="font-size:15px;">轴向值(A)(°)</span>
                                                <i-input number v-model.trim="obj.l_a" :maxlength="4"
                                                         :disabled="disabled"
                                                         style="width: 110px;position: absolute;right: 0;"
                                                ></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>

                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="屈光临床印象" :label-width="80" prop="diolcyx">
                                        <i-select multiple v-model.trim="obj.diolcyx" :disabled="disabled">
                                            <i-option value="未见异常">未见异常</i-option>
                                            <i-option value="近视">近视</i-option>
                                            <i-option value="远视">远视</i-option>
                                            <i-option value="弱视">弱视</i-option>
                                            <i-option value="散光">散光</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="4">
                                <i-col span="8">
                                    <FormItem class="pad" label="角膜曲率半径*" :label-width="90" prop="jmqlbj">
                                        <span slot="label" style="position:relative;">
                                            <span>角膜曲率半径(mm)</span>
                                            <span style="position: absolute;top: 10px;right: -34px;">*</span>
                                        </span>
                                        <i-input number v-model.trim="obj.jmqlbj" :disabled="disabled"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="9">
                                    <FormItem label="眼轴长度*(mm)" class="right-label" :label-width="130" prop="yzcd">
                                        <i-input number v-model.trim="obj.yzcd" :disabled="disabled"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="7">
                                    <FormItem label="色觉*" class="right-label" :label-width="70" prop="sj">
                                        <span slot="label">色&nbsp;觉*</span>
                                        <i-select v-model.trim="obj.sj" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="0">异常</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="随访*" :label-width="60" prop="sf">
                                        <i-input v-model.trim="obj.sf" :disabled="disabled" :maxlength="100"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="转诊*" :label-width="60" prop="zz">
                                        <i-input v-model.trim="obj.zz" :disabled="disabled" :maxlength="100"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">
                                视力 <span style="font-size: 14px;">(按5.0计数法)</span>
                                <!--<span class="abnormal"-->
                                <!--v-show="pd_abnormal(set_id,'3438ae5f1a8249c192c0e8abf1629210')">异常</span>-->
                            </h4>
                            <Row :gutter="16" class="bottom">
                                <i-col span="6">
                                    <FormItem class="pad right-label" label="右眼裸眼视力" :label-width="70"
                                              prop="eyesights.r_eyesight">
                                        <i-input v-model.trim="obj.eyesights.r_eyesight" :disabled="disabled"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼裸眼视力" class="pad right-label" :label-width="70"
                                              prop="eyesights.l_eyesight">
                                        <i-input v-model.trim="obj.eyesights.l_eyesight" :disabled="disabled"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="右眼戴镜视力" class="pad right-label" :label-width="70"
                                              prop="eyesights.r_bcva">
                                        <i-input v-model.trim="obj.eyesights.r_bcva" :disabled="disabled"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼戴镜视力" class="pad right-label" :label-width="70"
                                              prop="eyesights.l_bcva">
                                        <i-input v-model.trim="obj.eyesights.l_bcva" :disabled="disabled"
                                                 :maxlength="4"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">口腔科</h4>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem class="first-label" label="齿列" :label-width="60"
                                              prop="stomatologys.dentition">
                                        <span slot="label">齿列</span>
                                        <i-select v-model.trim="obj.stomatologys.dentition" :disabled="disabled">
                                            <i-option :value="1">整齐</i-option>
                                            <i-option :value="2">不齐</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="牙周" :label-width="60" prop="stomatologys.periodontal">
                                        <span slot="label">牙周</span>
                                        <i-select v-model.trim="obj.stomatologys.periodontal" :disabled="disabled">
                                            <i-option :value="1">正常</i-option>
                                            <i-option :value="2">异常</i-option>
                                            <!--<i-option :value="1">阴性</i-option>-->
                                            <!--<i-option :value="2">牙龈炎</i-option>-->
                                            <!--<i-option :value="3">牙石</i-option>-->
                                            <!--<i-option :value="4">浅牙周袋</i-option>-->
                                            <!--<i-option :value="5">深牙周袋</i-option>-->
                                            <!--<i-option :value="6">其他</i-option>-->
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="有无龋齿" class="right-label" :label-width="86"
                                              prop="stomatologys.decayed_tooth">
                                        <i-select v-model.trim="obj.stomatologys.decayed_tooth" :disabled="disabled">
                                            <i-option :value="1">无</i-option>
                                            <i-option :value="2">有</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="12">
                                    <Row :gutter="4">
                                        <i-col span="15">
                                            <FormItem class="first-label" label="龋患" :label-width="60"
                                                      prop="stomatologys.he_broken">
                                                <span slot="label">龋患</span>
                                                <span>恒牙</span>
                                                <i-input style="width: 70px;display: inline-block;"
                                                         number
                                                         :disabled="disabled"
                                                         v-model.trim="obj.stomatologys.he_broken"
                                                         :maxlength="2"></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="9">
                                            <FormItem class="first-label" :label-width="0"
                                                      prop="stomatologys.ru_broken">
                                                <span>乳牙</span>
                                                <i-input v-model.trim="obj.stomatologys.ru_broken"
                                                         number
                                                         :disabled="disabled"
                                                         style="width: 60px;display: inline-block;"
                                                         :maxlength="2"></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>
                                <i-col span="12">
                                    <Row :gutter="4">
                                        <i-col span="15">
                                            <FormItem class="first-label" label="龋失" :label-width="60"
                                                      prop="stomatologys.he_lose">
                                                <span slot="label">龋失</span>
                                                <span>恒牙</span>
                                                <i-input v-model.trim="obj.stomatologys.he_lose"
                                                         :disabled="disabled"
                                                         number
                                                         style="width: 70px;display: inline-block;"
                                                         :maxlength="2"></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="9">
                                            <FormItem class="first-label" :label-width="0" prop="stomatologys.ru_lose">
                                                <span>乳牙</span>
                                                <i-input v-model.trim="obj.stomatologys.ru_lose"
                                                         number
                                                         :disabled="disabled"
                                                         style="width: 69px;display: inline-block;"
                                                         :maxlength="2"></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="12">
                                    <Row :gutter="4">
                                        <i-col span="15">
                                            <FormItem class="first-label" label="龋补" :label-width="60"
                                                      prop="stomatologys.he_repair">
                                                <span slot="label">龋补</span>
                                                <span>恒牙</span>
                                                <i-input v-model.trim="obj.stomatologys.he_repair"
                                                         number
                                                         :disabled="disabled"
                                                         style="width: 70px;display: inline-block;"
                                                         :maxlength="2"></i-input>
                                            </FormItem>
                                        </i-col>
                                        <i-col span="9">
                                            <FormItem class="first-label" :label-width="0"
                                                      prop="stomatologys.ru_repair">
                                                <span>乳牙</span>
                                                <i-input v-model.trim="obj.stomatologys.ru_repair"
                                                         number
                                                         :disabled="disabled"
                                                         style="width: 60px;display: inline-block;"
                                                         :maxlength="2"></i-input>
                                            </FormItem>
                                        </i-col>
                                    </Row>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="first-label" label="其他记录" :label-width="86"
                                              prop="remark">
                                        <i-input v-model.trim="obj.remark" :disabled="disabled"
                                                 :maxlength="100"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">检验</h4>
                            <Row :gutter="16">
                                <i-col span="12">
                                    <FormItem class="first-label pad" label="谷丙转氨酶ALT(U/L)**" :label-width="100"
                                              prop="clinicalLabs.alt">
                                        <i-input number v-model.trim="obj.clinicalLabs.alt" :disabled="disabled"
                                                 :maxlength="5"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="pad" label="总胆红素TBIL(g/L)**" :label-width="100"
                                              prop="clinicalLabs.tbil">
                                        <i-input number v-model.trim="obj.clinicalLabs.tbil" :disabled="disabled"
                                                 :maxlength="5"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="24">
                                    <FormItem class="first-label pad" label="血红蛋白(umol/L)**" :label-width="100"
                                              prop="clinicalLabs.hemoglobin">
                                        <i-input number v-model.trim="obj.clinicalLabs.hemoglobin" :disabled="disabled"
                                                 :maxlength="5"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem class="pad" label="其他化验结果*" :label-width="100" prop="clinicalLabs.other_clinical">
                                        <i-input v-model.trim="obj.clinicalLabs.other_clinical" :disabled="disabled"
                                                 :maxlength="100"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">检查</h4>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="胸部X线检查*" :label-width="120" prop="inspects.x_ray">
                                        <i-select v-model.trim="obj.inspects.x_ray" :disabled="disabled">
                                            <i-option :value="1">未见异常</i-option>
                                            <i-option :value="2">异常</i-option>
                                        </i-select>

                                    </FormItem>
                                    <FormItem v-if="obj.inspects.x_ray===2" prop="inspects.description">
                                        <i-input placeholder="异常情况说明" :maxlength="50"
                                                 v-model.trim="obj.inspects.description"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <!-- 升学体检 -->
                            <h4 class="bodys" v-if="obj.phy_type=='2'">结核菌素皮肤试验检查</h4>
                            <!--<Row :gutter="16" v-if="obj.phy_type=='2'">-->
                            <!--<i-col span="12">-->
                            <!--<FormItem label="注射时间" class="first-label" :label-width="86"-->
                            <!--prop="skinTests.inject_time">-->
                            <!--<DatePicker type="datetime" format="yyyy-MM-dd HH:mm"-->
                            <!--v-model.trim="obj.skinTests.inject_time"-->
                            <!--:disabled="disabled"></DatePicker>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--<i-col span="12">-->
                            <!--<FormItem label="硬结直径(横径X纵径)(mm)" prop="skinTests.dia" class="pad"-->
                            <!--:label-width="125">-->
                            <!--<i-input number v-model.trim="obj.skinTests.dia" :maxlength="4"-->
                            <!--:disabled="disabled"></i-input>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--</Row>-->
                            <!--<Row :gutter="16" v-if="obj.phy_type=='2'">-->
                            <!--<i-col span="12">-->
                            <!--<FormItem label="平均直径(mm)" :label-width="120" prop="skinTests.average_dia">-->
                            <!--<i-input number v-model.trim="obj.skinTests.average_dia" :disabled="disabled"-->
                            <!--:maxlength="4"></i-input>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--<i-col span="12">-->

                            <!--<FormItem label="检验反应时间" :label-width="120" prop="skinTests.response_time">-->
                            <!--<DatePicker type="datetime" format="yyyy-MM-dd HH:mm"-->
                            <!--v-model.trim="obj.skinTests.response_time"-->
                            <!--:disabled="disabled"></DatePicker>-->
                            <!--</FormItem>-->
                            <!--</i-col>-->
                            <!--</Row>-->
                            <Row :gutter="16" v-if="obj.phy_type=='2'">
                                <!--<i-col span="12">-->
                                <!--<FormItem label="注射后局部情况" :label-width="130" prop="skinTests.condition">-->
                                <!--<i-select v-model.trim="obj.skinTests.condition" :disabled="disabled">-->
                                <!--<i-option :value="1">水疱</i-option>-->
                                <!--<i-option :value="2">溃疡</i-option>-->
                                <!--<i-option :value="3">坏死</i-option>-->
                                <!--<i-option :value="4">淋巴管炎</i-option>-->
                                <!--<i-option :value="5">无异常</i-option>-->
                                <!--</i-select>-->
                                <!--</FormItem>-->
                                <!--</i-col>-->
                                <i-col span="24">
                                    <FormItem label="结果判定" :label-width="90" prop="skinTests.result">
                                        <i-select v-model.trim="obj.skinTests.result" :disabled="disabled">
                                            <i-option :value="1">阴性</i-option>
                                            <i-option :value="2">一般阳性</i-option>
                                            <i-option :value="3">中度阳性</i-option>
                                            <i-option :value="4">强阳性</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </i-col>
                        <i-col span="12">
                            <h4 class="bodys">外科</h4>
                            <Row>
                                <i-col>
                                    <FormItem label="皮肤" :label-width="70" prop="surgerys.skin">
                                        <span slot="label">皮&emsp;肤</span>
                                        <i-select multiple v-model.trim="obj.surgerys.skin" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="潮红">潮红</i-option>
                                            <i-option value="苍白">苍白</i-option>
                                            <i-option value="发绀">发绀</i-option>
                                            <i-option value="黄染">黄染</i-option>
                                            <i-option value="色素沉着">色素沉着</i-option>
                                            <i-option value="湿疹">湿疹</i-option>
                                            <i-option value="糜烂">糜烂</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem v-if="obj.surgerys.skin.includes('其他')" :label-width="70"
                                              prop="surgerys.skin_str">
                                        <i-input placeholder="需说明"
                                                 :maxlength="50"
                                                 v-model.trim="obj.surgerys.skin_str" :disabled="disabled"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="淋巴结" :label-width="70" prop="surgerys.lymph">
                                        <span slot="label">淋巴结</span>
                                        <i-select multiple v-model.trim="obj.surgerys.lymph" :disabled="disabled">
                                            <i-option value="未触及">未触及</i-option>
                                            <i-option value="锁骨上">锁骨上</i-option>
                                            <i-option value="腋窝">腋窝</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>

                                    </FormItem>
                                    <FormItem v-if="obj.surgerys.lymph.includes('其他')" :label-width="70"
                                              prop="surgerys.lymph_str">
                                        <i-input placeholder="需说明"
                                                 :maxlength="50"
                                                 v-model.trim="obj.surgerys.lymph_str" :disabled="disabled"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="头部" :label-width="70" prop="surgerys.head">
                                        <span slot="label">头&emsp;部</span>
                                        <i-select multiple v-model.trim="obj.surgerys.head" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="耳廓畸形">耳廓畸形</i-option>
                                            <i-option value="头部外伤">头部外伤</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>

                                    </FormItem>
                                    <FormItem v-if="obj.surgerys.head.includes('其他')" :label-width="70"
                                              prop="surgerys.head_str">
                                        <i-input placeholder="需说明"
                                                 :maxlength="50"
                                                 v-model.trim="obj.surgerys.head_str" :disabled="disabled"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="颈部" :label-width="70" prop="surgerys.neck">
                                        <span slot="label">颈&emsp;部</span>
                                        <i-select multiple v-model.trim="obj.surgerys.neck" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="甲状腺肿大">甲状腺肿大</i-option>
                                            <i-option value="颈部外伤">颈部外伤</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>

                                    </FormItem>
                                    <FormItem v-if="obj.surgerys.neck.includes('其他')" :label-width="70"
                                              prop="surgerys.neck_str">
                                        <i-input placeholder="需说明"
                                                 :maxlength="50"
                                                 v-model.trim="obj.surgerys.neck_str" :disabled="disabled"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="脊柱" :label-width="70" prop="surgerys.spine">
                                        <span slot="label">脊&emsp;柱</span>
                                        <i-select multiple v-model.trim="obj.surgerys.spine" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="脊柱侧弯">脊柱侧弯</i-option>
                                            <i-option value="脊柱矫正中">脊柱矫正中</i-option>
                                            <i-option value="脊柱术后">脊柱术后</i-option>
                                            <i-option value="脊柱呈S型">脊柱呈S型</i-option>
                                            <i-option value="脊柱后凸">脊柱后凸</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>

                                    </FormItem>
                                    <FormItem v-if="obj.surgerys.spine.includes('其他')" :label-width="70"
                                              prop="surgerys.spine_str">
                                        <i-input :disabled="disabled"
                                                 placeholder="需说明"
                                                 :maxlength="50"
                                                 v-model.trim="obj.surgerys.spine_str"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="四肢" :label-width="70" prop="surgerys.legs">
                                        <span slot="label">四&emsp;肢</span>
                                        <i-select multiple v-model.trim="obj.surgerys.legs" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="骨折">骨折</i-option>
                                            <i-option value="先天畸形">先天畸形</i-option>
                                            <i-option value="扁平足">扁平足</i-option>
                                            <i-option value="跛行">跛行</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>

                                    </FormItem>
                                    <FormItem v-if="obj.surgerys.legs.includes('其他')" :label-width="70"
                                              prop="surgerys.legs_str">
                                        <i-input :disabled="disabled"
                                                 placeholder="需说明"
                                                 :maxlength="50"
                                                 v-model.trim="obj.surgerys.legs_str"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="胸部" :label-width="70" prop="surgerys.throax">
                                        <span slot="label">胸&emsp;部</span>
                                        <i-select multiple v-model.trim="obj.surgerys.throax" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="桶状胸">桶状胸</i-option>
                                            <i-option value="扁平胸">扁平胸</i-option>
                                            <i-option value="鸡胸">鸡胸</i-option>
                                            <i-option value="漏斗胸">漏斗胸</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>

                                    </FormItem>
                                    <FormItem v-if="obj.surgerys.throax.includes('其他')" :label-width="70"
                                              prop="surgerys.throax_str">
                                        <i-input :disabled="disabled"
                                                 placeholder="需说明"
                                                 :maxlength="50"
                                                 v-model.trim="obj.surgerys.throax_str"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <Row style="margin-bottom: 20px!important">
                                <i-col>
                                    <FormItem label="其他记录*" class="pad" :label-width="70" prop="surgerys.other">
                                        <i-input v-model.trim="obj.surgerys.other" :disabled="disabled"
                                                 :maxlength="50"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">内科</h4>
                            <Row>
                                <i-col>
                                    <FormItem class="pad" label="近期不适症状" :label-width="70"
                                              prop="internals.recent_unwell">
                                        <i-select multiple v-model="obj.internals.recent_unwell" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="疲乏无力">疲乏无力</i-option>
                                            <i-option value="低热">低热</i-option>
                                            <i-option value="盗汗">盗汗</i-option>
                                            <i-option value="胸痛">胸痛</i-option>
                                            <i-option value="咳嗽">咳嗽</i-option>
                                            <i-option value="咳痰">咳痰</i-option>
                                            <i-option value="食欲减退">食欲减退</i-option>
                                            <i-option value="消瘦">消瘦</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="其他症状*" :label-width="70" prop="internals.other_unwell">
                                        <i-input v-model.trim="obj.internals.other_unwell" :disabled="disabled"
                                                 :maxlength="50"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="心" :label-width="70" prop="internals.heart">
                                        <i-select multiple v-model.trim="obj.internals.heart" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="心脏杂音">心脏杂音</i-option>
                                            <i-option value="心律不齐">心律不齐</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem v-if="obj.internals.heart.includes('其他')" :label-width="70"
                                              prop="internals.heart_str">
                                        <i-input :maxlength="50"
                                                 v-model.trim="obj.internals.heart_str" :disabled="disabled"
                                                 placeholder="需说明"
                                        ></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="肺" :label-width="70" prop="internals.lung">
                                        <i-select multiple v-model.trim="obj.internals.lung" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="哮鸣音">哮鸣音</i-option>
                                            <i-option value="干啰音">干啰音</i-option>
                                            <i-option value="湿啰音">湿啰音</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem v-if="obj.internals.lung.includes('其他')" :label-width="70"
                                              prop="internals.lung_str">
                                        <i-input placeholder="需说明"
                                                 :disabled="disabled"
                                                 :maxlength="50"
                                                 v-model.trim="obj.internals.lung_str"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="肝" :label-width="70" prop="internals.liver">
                                        <i-select multiple v-model.trim="obj.internals.liver" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="肝肿大">肝肿大</i-option>
                                            <i-option value="肝区压痛">肝区压痛</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem v-if="obj.internals.liver.includes('其他')" :label-width="70"
                                              prop="internals.liver_str">
                                        <i-input placeholder="需说明"
                                                 :disabled="disabled"
                                                 :maxlength="50"
                                                 v-model.trim="obj.internals.liver_str"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="脾" :label-width="70" prop="internals.spleen">
                                        <i-select multiple v-model.trim="obj.internals.spleen" :disabled="disabled">
                                            <i-option value="正常">正常</i-option>
                                            <i-option value="脾肿大">脾肿大</i-option>
                                            <i-option value="脾区压痛">脾区压痛</i-option>
                                            <i-option value="其他">其他</i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem v-if="obj.internals.spleen.includes('其他')" :label-width="70"
                                              prop="internals.spleen_str">
                                        <i-input placeholder="需说明"
                                                 :disabled="disabled"
                                                 :maxlength="50"
                                                 v-model.trim="obj.internals.spleen_str"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col>
                                    <FormItem label="其他记录*" class="pad" :label-width="70" prop="internals.other_record">
                                        <i-input v-model.trim="obj.internals.other_record" :disabled="disabled"
                                                 :maxlength="50"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <!-- 升学体检 -->
                            <h4 class="bodys" v-if="obj.phy_type=='2'">结核病筛查检查</h4>
                            <Row v-if="obj.phy_type=='2'" style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="确认有无卡介苗接种史或卡痕？" :label-width="230" prop="tuberculosiss.confirm">
                                        <i-select v-model.trim="obj.tuberculosiss.confirm" :disabled="disabled">
                                            <i-option :value="1">无</i-option>
                                            <i-option :value="2">有</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="医生意见" :label-width="86" prop="tuberculosiss.doctor_result">
                                        <i-select multiple v-model.trim="obj.tuberculosiss.doctor_result"
                                                  :disabled="disabled">
                                            <i-option value="1">是肺结核可疑症状者</i-option>
                                            <i-option value="2">是肺结核密切接触者</i-option>
                                            <i-option value="3">不是肺结核可疑症状者</i-option>
                                            <i-option value="4">不是肺结核密切接触者</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">需复查项目</h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-select multiple v-model.trim="obj.mainInspects.retest_name"
                                                  :disabled="disabled">
                                            <i-option v-for="item of projectList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">健康评价</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem :label-width="20" prop="mainInspects.health_assessment">
                                        <RadioGroup v-model="obj.mainInspects.health_assessment">
                                            <Radio label="健康良好" :disabled="disabled"></Radio>
                                            <Radio label="患有疾病" :disabled="disabled"></Radio>
                                            <Radio label="身体残疾" :disabled="disabled"></Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">本次体检结论</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0" prop="mainInspects.main_result">
                                        <i-input type="textarea" v-model.trim="obj.mainInspects.main_result"
                                                 :disabled="disabled"
                                                 :maxlength="300"
                                                 :rows="5"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">健康指导</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem :label-width="0" prop="mainInspects.health_guide">
                                        <i-input v-model.trim="obj.mainInspects.health_guide" type="textarea"
                                                 :disabled="disabled"
                                                 :maxlength="300"
                                                 :rows="5"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col>
                                    <FormItem label="是否继续追踪" :label-width="120" prop="isOK">
                                        <RadioGroup v-model="obj.isOK">
                                            <Radio label="是" :disabled="disabled"></Radio>
                                            <Radio label="否" :disabled="disabled"></Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">追踪备注</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem :label-width="0" prop="content">
                                        <i-input v-model.trim="obj.content" type="textarea" :disabled="disabled"
                                                 :rows="5" :maxlength="1500"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
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
    import {datetimeformatFromString} from '@/libs/dateUtils';
    import * as maps from './maps';

    export default {
        name: 'Edit',
        props: ['student_id', 'title', 'status'],
        data() {
            return {
                title1: this.title,
                obj: {                //个人体检详细信息
                    dep_id: null,
                    grade_name: null,
                    class_name: null,
                    student_name: null,
                    gender: null,
                    anamnesis: null,
                    card_num: null,
                    past_medical: null,
                    friend_have: null,
                    have_touch: null,
                    other_symptoms: null,
                    main_symptoms: null,
                    phy_type: null,  //判断升学体检和入学体检
                    physicalExamRecords: { //形体
                        height: null,
                        weight: null,
                        bmi: null,
                        desk_mat: null,
                    },
                    jiem: null, //  结膜
                    jiaom: null, // 角膜 ,
                    jt: null,//晶体
                    tk: null,// 瞳孔 ,
                    yw: null,//眼位 ,
                    yqyd: null,//眼球运动 ,
                    ycsjxw: [],//异常视觉行为1无2畏光3眯眼4歪头 ,
                    qtycsjxw: null,//其他异常视觉行为 ,
                    dj: null, //戴镜情况 ,
                    dj_l: null,// 戴镜情况下左眼度数 ,
                    dj_r: null, // 戴镜情况下右眼度数

                    r_s: null,//右眼球镜s ,
                    r_c: null,// 右眼柱镜c ,
                    r_a: null,//右眼轴向值a ,
                    l_s: null, //左眼球镜s ,
                    l_c: null, // 左眼柱镜c ,
                    l_a: null, //左眼轴向值a

                    lcyx: [], //临床印象,
                    diolcyx: [],//屈光临床印象 ,
                    jmqlbj: null,// 角膜曲率半径 ,
                    yzcd: null,//眼轴长度 ,
                    sj: null,//色觉 ,
                    sf: null,//随访 ,
                    zz: null,//转诊
                    eyesights: {         //视力
                        r_eyesight: null,
                        l_eyesight: null,
                        r_bcva: null,
                        l_bcva: null
                    },
                    physicalFunctions: {  //生理功能
                        sp: null,
                        dp: null,
                        pulse: null
                    },
                    surgerys: {           //外科
                        skin: [],
                        skin_str: null,
                        head: [],
                        head_str: null,
                        neck: [],
                        neck_str: null,
                        spine: [],
                        spine_str: null,
                        lymph: [],
                        lymph_str: null,
                        legs: [],
                        legs_str: null,
                        throax: [],
                        throax_str: null,
                        other: null
                    },
                    clinicalLabs: {      //检验
                        alt: null,
                        tbil: null,
                        hemoglobin: null,
                        other_clinical: null
                    },

                    stomatologys: {      //口腔科
                        dentition: null,
                        periodontal: null,
                        decayed_tooth: null,
                        he_broken: null,
                        he_lose: null,
                        he_repair: null,
                        ru_broken: null,
                        ru_lose: null,
                        ru_repair: null
                    },
                    remark: null,

                    internals: {       //内科
                        recent_unwell: [],
                        other_unwell: null,
                        heart: [],
                        heart_str: null,
                        lung: [],
                        lung_str: null,
                        liver: [],
                        liver_str: null,
                        spleen: [],
                        spleen_str: null,
                        other_record: null
                    },
                    skinTests: {        //皮肤测试检查
                        result: null,
                        inject_time: null,
                        dia: null,
                        average_dia: null,
                        condition: null,
                        response_time: null
                    },
                    inspects: {        //检查科
                        x_ray: null,
                        description: null
                    },
                    create_time: null,
                    mainInspects: {     //主检
                        create_time: null,
                        health_assessment: null,
                        health_guide: null,
                        main_result: null,
                        retest_name: []
                    },
                    tuberculosiss: {     //结核病筛查检查
                        doctor_result: [],
                        confirm: null
                    },
                    content: null,
                    isOK: '是'
                },
                rules: {
                    'mainInspects.health_assessment': [{required: true, message: '请选择', trigger: 'change'}],
                    'mainInspects.main_result': [{required: true, message: '请输入', trigger: 'blur'}],
                    'mainInspects.health_guide': [{required: true, message: '请输入', trigger: 'blur'}],
                    'tuberculosiss.doctor_result': [{
                        required: true,
                        type: 'array',
                        message: '请选择',
                        trigger: 'change'
                    }],
                    'tuberculosiss.confirm': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],

                    'internals.recent_unwell': [{type: 'array', message: '请选择', trigger: 'change'}],
                    // 'internals.other_unwell': [{required: true, message: '请输入', trigger: 'blur'}],
                    'internals.heart': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'internals.heart_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'internals.lung': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'internals.lung_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'internals.liver': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'internals.liver_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'internals.spleen': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'internals.spleen_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    // 'internals.other_record': [{required: true, message: '请输入', trigger: 'blur'}],

                    'surgerys.skin': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'surgerys.skin_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'surgerys.head': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'surgerys.head_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'surgerys.neck': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'surgerys.neck_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'surgerys.spine': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'surgerys.spine_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'surgerys.lymph': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'surgerys.lymph_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'surgerys.legs': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'surgerys.legs_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    'surgerys.throax': [{required: true, type: 'array', message: '请选择', trigger: 'change'}],
                    'surgerys.throax_str': [{required: true, message: '请输入', trigger: 'blur'}],
                    // 'surgerys.other': [{required: true, message: '请输入', trigger: 'blur'}],

                    'physicalExamRecords.height': [
                        {required: true, type: 'number', message: '请输入身高', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}(\.[0-9])?$/, message: '身高必须为数字且最多一位小数点', trigger: 'blur'}
                    ],
                    'physicalExamRecords.weight': [
                        {required: true, type: 'number', message: '请输入体重', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}(\.[0-9])?$/, message: '体重必须为数字且最多一位小数点', trigger: 'blur'}
                    ],
                    'physicalExamRecords.desk_mat': [
                        {required: true, message: '请输入课桌椅型号', trigger: 'blur'}
                    ],
                    'physicalFunctions.dp': [
                        {required: true, type: 'number', message: '请输入舒张压', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}$/, message: '舒张压必须为整数', trigger: 'blur'}
                    ],
                    'physicalFunctions.pulse': [
                        {required: true, type: 'number', message: '请输入脉搏', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}$/, message: '脉搏次数必须为整数', trigger: 'blur'}
                    ],
                    'physicalFunctions.sp': [
                        {required: true, type: 'number', message: '请输入收缩压', trigger: 'blur'},
                        {pattern: /^[1-9][0-9]{1,2}$/, message: '收缩压必须为整数', trigger: 'blur'}],
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
                    // 'dj_r': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                    //     {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    // 'dj_l': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                    //     {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
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
                    'jmqlbj': [{pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'yzcd': [{pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    // 'sj': [{type: 'number', message: '请选择', trigger: 'change'}],
                    // 'sf': [{ message: '请输入', trigger: 'blur'}],
                    // 'zz': [{ message: '请输入', trigger: 'blur'}],
                    'eyesights.l_eyesight': [
                        {required: true, message: '请输入右眼视力', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.[0-9])?$/, message: '必须为数字且最多一位小数点', trigger: 'blur'}],
                    'eyesights.l_bcva': [
                        {required: true, message: '请输入右眼矫正视力', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.[0-9])?$/, message: '必须为数字且最多一位小数点', trigger: 'blur'}],
                    'eyesights.r_eyesight': [
                        {required: true, message: '请输入左眼视力', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.[0-9])?$/, message: '必须为数字且最多一位小数点', trigger: 'blur'}],
                    'eyesights.r_bcva': [
                        {required: true, message: '请输入左眼矫正视力', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.[0-9])?$/, message: '必须为数字且最多一位小数点', trigger: 'blur'}],
                    'stomatologys.dentition': [{required: true, type: 'number', message: '请输入', trigger: 'blur'}],
                    'stomatologys.periodontal': [{required: true, type: 'number', message: '请输入', trigger: 'blur'}],
                    'stomatologys.decayed_tooth': [{required: true, type: 'number', message: '请输入', trigger: 'blur'}],
                    'stomatologys.he_broken': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur'}],
                    'stomatologys.he_repair': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur'}],
                    'stomatologys.he_lose': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur'}],
                    'stomatologys.ru_broken': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur'}],
                    'stomatologys.ru_repair': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur'}],
                    'stomatologys.ru_lose': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请输入数字', trigger: 'blur'}],
                    // 'remark': [{required: true, message: '请输入', trigger: 'blur'}],
                    'clinicalLabs.alt': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}
                    ],

                    'clinicalLabs.tbil': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'clinicalLabs.hemoglobin': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    // 'clinicalLabs.other_clinical': [{required: true, message: '请输入', trigger: 'blur'}],
                    'inspects.x_ray': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'inspects.description': [{required: true, message: '请输入', trigger: 'blur'}],
                    'skinTests.inject_time': [{required: true, type: 'date', message: '请选择', trigger: 'change'}],
                    'skinTests.dia': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'skinTests.average_dia': [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                        {pattern: /^[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}],
                    'skinTests.response_time': [{required: true, type: 'date', message: '请选择', trigger: 'change'}],
                    'skinTests.condition': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'skinTests.result': [{required: true, type: 'number', message: '请选择', trigger: 'change'}],
                    'isOK': [
                        {required: true, message: '请选择', trigger: 'change'},
                    ],
                    'content': [
                        {required: true, message: '请输入追踪备注', trigger: 'blur'},
                    ]
                },
                data_back: '{}',
                disabled: false,
                projectList: []
            };
        },
        methods: {
            djChange(value) {
                // console.log(this)
                // if(value !== 4){
                //
                //     // this.$delete(this.rules, 'dj_r');
                //     // this.$delete(this.rules, 'dj_l');
                // }else {
                //     // this.$set(this.rules, 'dj_r',[{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                //     //     {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}]);
                //     // this.$set(this.rules, 'dj_l', [{required: true, type: 'number', message: '请输入数字', trigger: 'blur'},
                //     //     {pattern: /^-?[0-9]+(.[0-9]+)?$/, message: '请输入数字', trigger: 'blur'}]);
                // }

                this.obj.dj_r = null;
                this.obj.dj_l = null;
            },
            getSelectCondition() {
                this.$ajax({
                    url: urls.medicaltype_tree,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.projectList = data.data;
                    }
                });
            },
            // 判断数据是否异常函数
            pd_abnormal(set_id, yc) {
                // let set_id_array = this.set_id.split(',');
                // return set_id_array.indexOf(yc) > -1;
            },
            inputChange() {
                let height = this.obj.physicalExamRecords.height / 100;
                this.obj.physicalExamRecords.bmi = (this.obj.physicalExamRecords.weight / (height * height)).toFixed(2);
            },
            //复测个人信息详情
            getRetestInfo() {
                this.$ajax({
                    url: urls.follow_info,
                    data: {
                        student_id: this.student_id,
                        type: 1,
                        status: this.status
                    }
                }).then(data => {
                    if (data.code === 200) {
                        let _data = data.data;
                        this.data_back = JSON.stringify(_data);
                        const {
                            dep_id, grade_name, grade_no, class_name, student_name, card_num, other_symptoms,
                            main_symptoms, phy_type, is_boarding, disability, nation, desk_mat
                        } = _data;
                        this.obj.dep_id = dep_id;
                        this.obj.grade_name = grade_name;
                        this.obj.class_name = class_name;
                        this.obj.student_name = student_name;
                        this.obj.card_num = card_num;
                        this.obj.other_symptoms = other_symptoms;
                        this.obj.main_symptoms = main_symptoms;
                        // if (grade_no === '82649A1FDF56EA7EE050007F01001901' || grade_no === '82649A1FDF50EA7EE050007F01001901'
                        //     || grade_no === '82649A1FDF5AEA7EE050007F01001901') {
                        //     this.obj.phy_type = '2';
                        //     this.title1 = '学生升学检查复测';
                        // } else {
                        //     this.obj.phy_type = '1';
                        //     this.title1 = '学生健康体检复测';
                        // }
                        // this.obj.phy_type = _data.phy_type;

                        this.obj.is_boarding = is_boarding == '1' ? '是' : '否';
                        this.obj.disability = disability ? disability : '无';
                        this.obj.nation = nation ? nation : '汉';
                        this.obj.create_time = _data.create_time;
                        this.obj.content = _data.content;
                        //既往病史
                        if (_data.anamnesis != null) {
                            this.obj.anamnesis = _data.anamnesis;
                        } else {
                            this.obj.anamnesis = '无';
                        }

                        if (_data.gender != null) {
                            this.obj.gender = Number(_data.gender) === 1 ? '男' : '女';
                        }

                        this.obj.past_medical = _data.past_medical;
                        this.obj.friend_have = _data.friend_have;
                        this.obj.have_touch = _data.have_touch;

                        //形体
                        let {height, weight, bmi} = _data;
                        this.obj.physicalExamRecords = {height, weight, desk_mat};

                        height = height / 100;
                        this.obj.physicalExamRecords.bmi = (weight / (height * height)).toFixed(2);

                        //生理功能
                        let {sp, dp, pulse} = _data;
                        this.obj.physicalFunctions = {sp, dp, pulse};

                        //外科
                        let {
                            skin, skin_str, head, head_str, lymph, lymph_str, throax,
                            throax_str, neck, neck_str, spine, spine_str, legs, legs_str, other
                        } = _data;

                        skin_str = skin_str ? skin_str : '';
                        if (skin_str === '正常' || skin == 1) {
                            skin = ['正常'];
                            skin_str = '';
                        } else if (skin_str && skin_str.includes('其他')) {
                            let index = skin_str.indexOf(':');
                            skin = skin_str.substr(0, index).split(',');
                            skin_str = skin_str.substr(index + 1);
                        } else {
                            skin = skin_str.split(',');
                            skin_str = null;
                        }


                        head_str = head_str ? head_str : '';
                        if (head_str === '正常' || head == 1) {
                            head = ['正常'];
                            head_str = '';
                        } else if (head_str && head_str.includes('其他')) {
                            let index = head_str.indexOf(':');
                            head = head_str.substr(0, index).split(',');
                            skin_str = head_str.substr(index + 1);
                        } else {
                            head = head_str.split(',');
                            head_str = null;
                        }


                        lymph_str = lymph_str ? lymph_str : '';
                        if (lymph_str === '正常' || lymph == 1) {
                            lymph = ['未触及'];
                            lymph_str = '';
                        } else if (lymph_str && lymph_str.includes('其他')) {
                            let index = lymph_str.indexOf(':');
                            lymph = lymph_str.substr(0, index).split(',');
                            lymph_str = lymph_str.substr(index + 1);
                        } else {
                            lymph = lymph_str.split(',');
                            lymph_str = null;
                        }

                        throax_str = throax_str ? throax_str : '';
                        if (throax_str === '正常' || throax == 1) {
                            throax = ['正常'];
                            throax_str = '';
                        } else if (throax_str && throax_str.includes('其他')) {
                            let index = throax_str.indexOf(':');
                            throax = throax_str.substr(0, index).split(',');
                            throax_str = throax_str.substr(index + 1);
                        } else {
                            throax = throax_str.split(',');
                            throax_str = null;
                        }


                        neck_str = neck_str ? neck_str : '';
                        if (neck_str === '正常' || neck == 1) {
                            neck = ['正常'];
                            neck_str = '';
                        } else if (neck_str && neck_str.includes('其他')) {
                            let index = neck_str.indexOf(':');
                            neck = neck_str.substr(0, index).split(',');
                            neck_str = neck_str.substr(index + 1);
                        } else {
                            neck = neck_str.split(',');
                            neck_str = null;
                        }

                        spine_str = spine_str ? spine_str : '';
                        if (spine_str === '正常' || spine == 1) {
                            spine = ['正常'];
                            spine_str = '';
                        } else if (spine_str && spine_str.includes('其他')) {
                            let index = spine_str.indexOf(':');
                            spine = spine_str.substr(0, index).split(',');
                            spine_str = spine_str.substr(index + 1);
                        } else {
                            spine = spine_str.split(',');
                            spine_str = null;
                        }


                        legs_str = legs_str ? legs_str : '';
                        if (legs_str === '正常' || legs == 1) {
                            legs = ['正常'];
                            legs_str = '';
                        } else if (legs_str && legs_str.includes('其他')) {
                            let index = legs_str.indexOf(':');
                            legs = legs_str.substr(0, index).split(',');
                            legs_str = legs_str.substr(index + 1);
                        } else {
                            legs = legs_str.split(',');
                            legs_str = null;
                        }

                        this.obj.surgerys = {
                            skin,
                            skin_str,
                            head,
                            head_str,
                            lymph,
                            lymph_str,
                            throax,
                            throax_str,
                            neck,
                            neck_str,
                            spine,
                            spine_str,
                            legs,
                            legs_str,
                            other: other ? other : '无'
                        };

                        //结核病筛查检查
                        this.obj.tuberculosiss.confirm = _data.confirm;
                        this.obj.tuberculosiss.doctor_result = _data.doctor_result ? String(_data.doctor_result).split('') : [];

                        //检验科
                        let {alt, tbil, hemoglobin, other_clinical} = _data;
                        this.obj.clinicalLabs = {
                            alt,
                            tbil,
                            hemoglobin,
                            other_clinical: other_clinical ? other_clinical : '无'
                        };

                        //皮肤测试检查
                        this.obj.skinTests.inject_time = _data.inject_time ? new Date(_data.inject_time) : null;
                        this.obj.skinTests.response_time = _data.response_time ? new Date(_data.response_time) : null;
                        this.obj.skinTests.dia = _data.dia;
                        this.obj.skinTests.average_dia = _data.average_dia;
                        this.obj.skinTests.result = _data.result;
                        this.obj.skinTests.condition = _data.condition;

                        //眼科
                        const {jiem, jt, yw, jiaom, tk, yqyd, sj, ycsjxw, lcyx, diolcyx, sf, zz} = _data;
                        this.obj.jiem = jiem || jiem == 0 ? Number(jiem) : null;
                        this.obj.jt = jt || jt == 0 ? Number(jt) : null;
                        this.obj.yw = yw || yw == 0 ? Number(yw) : null;
                        this.obj.jiaom = jiaom || jiaom == 0 ? Number(jiaom) : null;
                        this.obj.tk = tk || tk == 0 ? Number(tk) : null;
                        this.obj.yqyd = yqyd || yqyd == 0 ? Number(yqyd) : null;

                        this.obj.sj = sj || sj == 0 ? Number(sj) : null;
                        this.obj.ycsjxw = ycsjxw ? ycsjxw.split(',') : [];
                        this.obj.lcyx = lcyx ? lcyx.split(',') : [];
                        this.obj.diolcyx = diolcyx ? diolcyx.split(',') : [];
                        this.obj.sf = sf;
                        this.obj.zz = zz;
                        const {dj_r, dj_l, jmqlbj, yzcd, r_s, r_c, r_a, l_s, l_c, l_a, dj} = _data;
                        this.obj.dj = dj;
                        this.obj.dj_r = dj === 4 ? dj_r : null;
                        this.obj.dj_l = dj === 4 ? dj_l : null;
                        this.obj.jmqlbj = jmqlbj;
                        this.obj.yzcd = yzcd;
                        this.obj.r_s = r_s;
                        this.obj.r_c = r_c;
                        this.obj.r_a = r_a;
                        this.obj.l_s = l_s;
                        this.obj.l_c = l_c;
                        this.obj.l_a = l_a;


                        //视力
                        let {r_eyesight, l_eyesight, r_bcva, l_bcva} = _data;

                        this.obj.eyesights = {
                            r_eyesight: r_eyesight || r_eyesight == 0 ? Number(r_eyesight).toFixed(1) : null,
                            l_eyesight: l_eyesight || l_eyesight == 0 ? Number(l_eyesight).toFixed(1) : null,
                            r_bcva: r_bcva || r_bcva == 0 ? Number(r_bcva).toFixed(1) : null,
                            l_bcva: l_bcva || l_bcva == 0 ? Number(l_bcva).toFixed(1) : null
                        };

                        //口腔科
                        const {
                            he_broken, he_lose, he_repair, ru_repair, ru_broken, ru_lose,
                            periodontal, dentition, remark, decayed_tooth
                        } = _data;
                        this.obj.stomatologys.he_broken = he_broken;
                        this.obj.stomatologys.he_lose = he_lose;
                        this.obj.stomatologys.he_repair = he_repair;
                        this.obj.stomatologys.ru_broken = ru_broken;
                        this.obj.stomatologys.ru_lose = ru_lose;
                        this.obj.stomatologys.ru_repair = ru_repair;
                        this.obj.stomatologys.periodontal = periodontal;
                        this.obj.stomatologys.dentition = dentition;
                        this.obj.remark = remark ? remark : '无';
                        this.obj.stomatologys.decayed_tooth = decayed_tooth;


                        //内科
                        let {recent_unwell, other_unwell, heart, heart_str, lung, lung_str, liver, liver_str, spleen, spleen_str, other_record} = _data;

                        heart_str = heart_str ? heart_str : '';
                        if (heart_str === '正常' || heart == 1) {
                            heart = ['正常'];
                            heart_str = '';
                        } else if (heart_str && heart_str.includes('其他')) {
                            let index = heart_str.indexOf(':');
                            heart = heart_str.substr(0, index).split(',');
                            heart_str = heart_str.substr(index + 1);
                        } else {
                            heart = heart_str.split(',');
                            heart_str = null;
                        }

                        lung_str = lung_str ? lung_str : '';
                        if (lung_str === '正常' || lung == 1) {
                            lung = ['正常'];
                            lung_str = '';
                        } else if (lung_str && lung_str.includes('其他')) {
                            let index = lung_str.indexOf(':');
                            lung = lung_str.substr(0, index).split(',');
                            lung_str = lung_str.substr(index + 1);
                        } else {
                            lung = lung_str.split(',');
                            lung_str = null;
                        }

                        liver_str = liver_str ? liver_str : '';
                        if (liver_str === '正常' || liver == 1) {
                            liver = ['正常'];
                            liver_str = '';
                        } else if (liver_str && liver_str.includes('其他')) {
                            let index = liver_str.indexOf(':');
                            liver = liver_str.substr(0, index).split(',');
                            liver_str = liver_str.substr(index + 1);
                        } else {
                            liver = liver_str.split(',');
                            liver_str = null;
                        }

                        spleen_str = spleen_str ? spleen_str : '';
                        if (spleen_str === '正常' || spleen == 1) {
                            spleen = ['正常'];
                            spleen_str = '';
                        } else if (spleen_str && spleen_str.includes('其他')) {
                            let index = spleen_str.indexOf(':');
                            spleen = spleen_str.substr(0, index).split(',');
                            spleen_str = spleen_str.substr(index + 1);
                        } else {
                            spleen = spleen_str.split(',');
                            spleen_str = null;
                        }

                        this.obj.internals = {
                            recent_unwell: recent_unwell ? recent_unwell.split(',') : ['正常'],
                            other_unwell: other_unwell ? other_unwell : '无',
                            heart,
                            heart_str,
                            lung,
                            lung_str,
                            liver,
                            liver_str,
                            spleen,
                            spleen_str,
                            other_record: other_record ? other_record : '无'
                        };

                        //主检
                        const {health_assessment, health_guide, create_time, main_result, retest_name} = _data;

                        this.obj.mainInspects.health_guide = health_guide ? health_guide : '无';

                        this.obj.mainInspects.create_time = create_time;
                        this.obj.mainInspects.main_result = main_result ? main_result.replace(/<br>/g, '') : '无';
                        this.obj.mainInspects.retest_name = retest_name ? retest_name.split(',') : [];
                        if (health_assessment != null) {
                            if (health_assessment === 1) {
                                this.obj.mainInspects.health_assessment = '健康良好';
                            } else if (health_assessment === 2) {
                                this.obj.mainInspects.health_assessment = '患有疾病';
                            } else if (health_assessment === 3) {
                                this.obj.mainInspects.health_assessment = '身体残疾';
                            } else {
                                this.obj.mainInspects.health_assessment = null;
                            }
                        }

                        if (_data.isOK) {
                            this.obj.isOK = _data.isOK === 0 ? '是' : '否';
                        } else {
                            this.obj.isOK = '是';
                        }


                        //检查科
                        this.obj.inspects.x_ray = _data.x_ray;
                    }
                    return this.$ajax({
                        url: urls.retest_single_info,
                        data: {
                            student_id: this.student_id,
                            type: 2
                        }
                    })
                }).then(data => {
                    if(data.code === 200){
                        this.obj.phy_type = data.data.phy_type;
                        this.title1 =  data.data.phy_type == '2' ? '学生升学检查报告详情' : '学生健康体检报告详情';
                    }
                });
            },
            confirms() {
                const {
                    skin, head, neck,
                    spine, lymph, legs, throax,
                } = this.obj.surgerys;
                const {ycsjxw, lcyx, diolcyx} = this.obj;

                if (ycsjxw.length > 1 && ycsjxw.includes('未见异常')) {
                    this.$Message.error('异常视觉行为 未见异常 选项与其他的选项互斥，请重新选择');
                    return false;
                }

                if (lcyx.length > 1 && lcyx.includes('未见异常')) {
                    this.$Message.error('临床印象 未见异常 选项与其他的选项互斥，请重新选择');
                    return false;
                }

                if (diolcyx.length > 1 && diolcyx.includes('未见异常')) {
                    this.$Message.error('屈光临床印象 未见异常 选项与其他的选项互斥，请重新选择');
                    return false;
                }

                if (skin.length > 1 && skin.includes('正常')) {
                    this.$Message.error('皮肤 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (lymph.length > 1 && lymph.includes('未触及')) {
                    this.$Message.error('淋巴结 未触及 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (head.length > 1 && head.includes('正常')) {
                    this.$Message.error('头部 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (neck.length > 1 && neck.includes('正常')) {
                    this.$Message.error('颈部 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (spine.length > 1 && spine.includes('正常')) {
                    this.$Message.error('脊柱 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }

                if (legs.length > 1 && legs.includes('正常')) {
                    this.$Message.error('四肢 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (throax.length > 1 && throax.includes('正常')) {
                    this.$Message.error('胸部 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }

                const {heart, lung, liver, spleen,recent_unwell} = this.obj.internals; //内科

                if (recent_unwell.length > 1 && recent_unwell.includes('正常')) {
                    this.$Message.error('近期不适症状 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (heart.length > 1 && heart.includes('正常')) {
                    this.$Message.error('心 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (lung.length > 1 && lung.includes('正常')) {
                    this.$Message.error('肺 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (liver.length > 1 && liver.includes('正常')) {
                    this.$Message.error('肝 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }
                if (spleen.length > 1 && spleen.includes('正常')) {
                    this.$Message.error('脾 正常 选项与其他的选项互斥，请重新选择');
                    return false;
                }


                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }

                    if (this.obj.dj === 4) {
                        if (!this.obj.dj_r) {
                            this.$Message.error('戴镜情况右眼必填');
                            return false;
                        }
                        if (!/^-?[0-9]+(.[0-9]+)?$/.test(this.obj.dj_r)) {
                            this.$Message.error('戴镜情况右眼为数字');
                            return false;
                        }

                        if (!this.obj.dj_l) {
                            this.$Message.error('戴镜情况左眼必填');
                            return false;
                        }

                        if (!(/^-?[0-9]+(.[0-9]+)?$/.test(this.obj.dj_l))) {
                            this.$Message.error('戴镜情况左眼为数字');
                            return false;
                        }
                    }

                    let json = JSON.parse(this.data_back);
                    const {
                        dep_id, grade_name, grade_no, class_name, student_name, gender, card_num,
                        is_boarding, nation, anamnesis, disability, phy_type, clinical_no, student_code,
                        create_by, l_d_dt, l_u_dt, r_d_dt, r_u_dt, student_id, year, qtycsjxw, qgbz_left, qgbz
                    } = json;
                    const {past_medical, friend_have, have_touch, other_symptoms, main_symptoms} = this.obj;
                    const {height, weight, bmi, desk_mat} = this.obj.physicalExamRecords;
                    const {sp, dp, pulse} = this.obj.physicalFunctions;
                    const {
                        jiem, jiaom, jt, tk, yw, yqyd, ycsjxw, dj, dj_l, dj_r, r_s, r_c, r_a, l_s, l_c,
                        l_a, lcyx, diolcyx, jmqlbj, yzcd, sj, sf, zz
                    } = this.obj;
                    const {r_eyesight, l_eyesight, r_bcva, l_bcva} = this.obj.eyesights;
                    const {
                        dentition, periodontal, decayed_tooth, he_broken, he_lose,
                        he_repair, ru_broken, ru_lose, ru_repair
                    } = this.obj.stomatologys;
                    const {remark} = this.obj;
                    const {alt, tbil, hemoglobin, other_clinical} = this.obj.clinicalLabs; //检验
                    const {x_ray, description} = this.obj.inspects;
                    const {result, inject_time, dia, average_dia, condition, response_time} = this.obj.skinTests;   //皮肤测试检查
                    let {
                        skin, skin_str, head, head_str, neck, neck_str,
                        spine, spine_str, lymph, lymph_str, legs, legs_str, throax, throax_str, other
                    } = this.obj.surgerys;       //外科

                    const {doctor_result, confirm} = this.obj.tuberculosiss;
                    const {create_time, health_assessment, health_guide, main_result, retest_name} = this.obj.mainInspects;   //主检
                    let {
                        recent_unwell, other_unwell, heart, heart_str, lung, lung_str,
                        liver, liver_str, spleen, spleen_str, other_record
                    } = this.obj.internals;      //内科

                    const {content, isOK} = this.obj;

                    let skin_tmp = skin.map(item => maps.map1[item]);
                    let skin1 = skin.slice(), skin_t = '';

                    let skin_index = skin1.indexOf('其他');
                    if (skin_index !== -1) {
                        skin1.splice(skin_index, 1);
                        skin1.push('其他');
                        skin_t = skin1.join() + ':' + skin_str;
                    } else {
                        skin_t = skin1.join();
                    }
                    skin1 = skin.includes('正常') ? 1 : 2;


                    let lymph_tmp = lymph.map(item => maps.map2[item]);
                    let lymph1 = lymph.slice(), lymph_t = '';
                    let lymph_index = lymph.indexOf('其他');
                    if (lymph_index !== -1) {
                        lymph1.splice(lymph_index, 1);
                        lymph1.push('其他');
                        lymph_t = lymph1.join() + ':' + lymph_str;
                    } else {
                        lymph_t = lymph1.join();
                    }
                    lymph1 = lymph.includes('未触及') ? 1 : 2;
                    lymph.includes('未触及') ? lymph_t = '正常' : '';

                    let head_tmp = head.map(item => maps.map3[item]);
                    let head1 = head.slice(), head_t = '';
                    let head_index = head.indexOf('其他');
                    if (head_index !== -1) {
                        head1.splice(head_index, 1);
                        head1.push('其他');
                        head_t = head1.join() + ':' + head_str;
                    } else {
                        head_t = head1.join();
                    }
                    head1 = head.includes('正常') ? 1 : 2;

                    let neck_tmp = neck.map(item => maps.map4[item]);
                    let neck1 = neck.slice(), neck_t = '';
                    let neck_index = neck.indexOf('其他');
                    if (neck_index !== -1) {
                        neck1.splice(neck_index, 1);
                        neck1.push('其他');
                        neck_t = neck1.join() + ':' + neck_str;
                    } else {
                        neck_t = neck1.join();
                    }
                    neck1 = neck.includes('正常') ? 1 : 2;

                    let spine_tmp = spine.map(item => maps.map5[item]);
                    let spine1 = spine.slice(), spine_t = '';
                    let spine_index = spine.indexOf('其他');
                    if (spine_index !== -1) {
                        spine1.splice(spine_index, 1);
                        spine1.push('其他');
                        spine_t = spine1.join() + ':' + spine_str;
                    } else {
                        spine_t = spine.join();
                    }
                    spine1 = spine.includes('正常') ? 1 : 2;

                    let legs_tmp = legs.map(item => maps.map6[item]);
                    let legs1 = legs.slice(), legs_t = '';
                    let legs_index = legs.indexOf('其他');
                    if (legs_index !== -1) {
                        legs1.splice(legs_index, 1);
                        legs1.push('其他');
                        legs_t = legs1.join() + ':' + legs_str;
                    } else {
                        legs_t = legs1.join();
                    }
                    legs1 = legs.includes('正常') ? 1 : 2;

                    let throax_tmp = throax.map(item => maps.map7[item]);
                    let throax1 = throax.slice(), throax_t = '';
                    let throax_index = throax1.indexOf('其他');
                    if (throax_index !== -1) {
                        throax1.splice(throax_index, 1);
                        throax1.push('其他');
                        throax_t = throax1.join() + ':' + throax_str;
                    } else {
                        throax_t = throax1.join();
                    }
                    throax1 = throax.includes('正常') ? 1 : 2;


                    let heart_tmp = heart.map(item => maps.map8[item]);
                    let heart1 = heart.slice(), heart_t = '';
                    let heart_index = heart.indexOf('其他');
                    if (heart_index !== -1) {
                        heart1.splice(heart_index, 1);
                        heart1.push('其他');
                        heart_t = heart1.join() + ':' + heart_str;
                    } else {
                        heart_t = heart1.join();
                    }
                    heart1 = heart.includes('正常') ? 1 : 2;

                    let lung_tmp = lung.map(item => maps.map9[item]);
                    let lung1 = lung.slice(), lung_t = '';
                    let lung_index = lung.indexOf('其他');
                    if (lung_index !== -1) {
                        lung1.splice(lung_index, 1);
                        lung1.push('其他');
                        lung_t = lung1.join() + ':' + lung_str;
                    } else {
                        lung_t = lung1.join();
                    }
                    lung1 = lung.includes('正常') ? 1 : 2;

                    let liver_tmp = liver.map(item => maps.map10[item]);
                    let liver1 = liver.slice(), liver_t = '';
                    let liver_index = liver.indexOf('其他');
                    if (liver_index !== -1) {
                        liver1.splice(liver_index, 1);
                        liver1.push('其他');
                        liver_t = liver1.join() + ':' + liver_str;
                    } else {
                        liver_t = liver1.join();
                    }
                    liver1 = liver.includes('正常') ? 1 : 2;

                    let spleen_tmp = spleen.map(item => maps.map11[item]);
                    let spleen1 = spleen.slice(), spleen_t = '';
                    let spleen_index = spleen.indexOf('其他');
                    if (spleen_index !== -1) {
                        spleen1.splice(spleen_index, 1);
                        spleen1.push('其他');
                        spleen_t = spleen1.join() + ':' + spleen_str;
                    } else {
                        spleen_t = spleen1.join();
                    }
                    spleen1 = spleen.includes('正常') ? 1 : 2;

                    let data = {
                        student_id: student_id,
                        student_code: student_code,
                        year: year,
                        dep_id: dep_id,
                        grade_name: grade_name,
                        grade_no: grade_no,
                        class_name: class_name,
                        student_name: student_name,
                        gender: gender,
                        anamnesis: anamnesis,
                        card_num: card_num,
                        past_medical: past_medical,
                        friend_have: friend_have,
                        have_touch: have_touch,
                        disability: disability,
                        other_symptoms: other_symptoms,
                        main_symptoms: main_symptoms,
                        phy_type: phy_type,  //判断升学体检和入学体检
                        create_by: create_by,

                        height: height,//身高
                        weight: weight,//体重 ,
                        bmi: bmi,
                        desk_mat: desk_mat,

                        sp: sp,//收缩压 ,
                        dp: dp, // 舒张压
                        pulse: pulse,//脉搏/心跳 ,

                        jiem: jiem, //  结膜
                        jiaom: jiaom, // 角膜 ,
                        jt: jt,//晶体
                        tk: tk,// 瞳孔 ,
                        yw: yw,//眼位 ,
                        yqyd: yqyd,//眼球运动 ,
                        ycsjxw: ycsjxw.join(),//异常视觉行为1无2畏光3眯眼4歪头 ,
                        qtycsjxw: qtycsjxw,//其他异常视觉行为 ,
                        dj: dj, //戴镜情况 ,
                        dj_l: dj_l,// 戴镜情况下左眼度数 ,
                        dj_r: dj_r, // 戴镜情况下右眼度数

                        r_s: r_s,//右眼球镜s ,
                        r_c: r_c,// 右眼柱镜c ,
                        r_a: r_a,//右眼轴向值a ,
                        l_s: l_s, //左眼球镜s ,
                        l_c: l_c, // 左眼柱镜c ,
                        l_a: l_a, //左眼轴向值a

                        lcyx: lcyx.join(), //临床印象,
                        diolcyx: diolcyx.join(),//屈光临床印象 ,
                        jmqlbj: jmqlbj,// 角膜曲率半径 ,
                        yzcd: yzcd,//眼轴长度 ,
                        sj: sj,//色觉 ,
                        sf: sf,//随访 ,
                        zz: zz,//转诊

                        r_eyesight: r_eyesight,//右眼视力 ,
                        l_eyesight: l_eyesight, //左眼视力 ,
                        r_bcva: r_bcva,//右眼矫正视力 ,
                        l_bcva: l_bcva,// 左眼矫正视力 ,

                        dentition: dentition, // 齿列枚举：1整齐、2不齐 ,
                        periodontal: periodontal,//牙周枚举：1阴性/2牙龈炎/3牙石/4浅牙周袋/5深牙周袋/6其他 ,
                        decayed_tooth: decayed_tooth, // 龋齿枚举：1无、2有 ,
                        he_broken: he_broken, // 恒牙龋患牙数 ,
                        he_lose: he_lose, // 恒牙龋失牙数 ,
                        he_repair: he_repair,// 恒牙龋补牙数 ,
                        ru_broken: ru_broken,// 乳牙龋患牙数 ,
                        ru_lose: ru_lose,//乳牙龋失牙数 ,
                        ru_repair: ru_repair,//乳牙龋补牙数 ,
                        remark: remark,//口腔其他备注 ,

                        // inject_time: inject_time ? datetimeformatFromString(inject_time) : null, // 注射时间 ,
                        inject_time_long: inject_time ? inject_time.getTime() : null,
                        dia: dia, // 硬结直径(mm)
                        average_dia: average_dia, // 平均直径
                        // response_time: response_time ? datetimeformatFromString(response_time) : null,// 检验反应时间（月/日/时）,
                        response_time_long: response_time ? response_time.getTime() : null,
                        condition: condition, // 注射后局部情况1水疱/2溃疡/3坏死/4淋巴管炎 ,
                        result: result,//结果1阴性/2一般阳性/3中度阳性/4强阳性 ,

                        recent_unwell: recent_unwell.join(),       // 近期不适1疲乏无力/2低热/3盗汗/4胸痛/5咳嗽/6咳痰/7食欲减退/8消瘦 ,
                        other_unwell: other_unwell,     //近期不适其他文本 ,
                        heart: heart1,       // 心
                        heart_str: heart_t,       // 心异常文本 ,
                        liver: liver1,       //肝
                        liver_str: liver_t,    // 肝异常文本 ,
                        lung: lung1,       //肺
                        lung_str: lung_t,        //肺异常文本 ,
                        spleen: spleen1,      //脾
                        spleen_str: spleen_t,       //脾异常文本 ,
                        other_record: other_record,         //其他记录文本 ,


                        skin: skin1,       //皮肤
                        skin_str: skin_t,       // 皮肤异常文本 ,
                        head: head1,                 // 头部
                        head_str: head_t, // 头部异常文本 ,
                        neck: neck1,                 //颈部
                        neck_str: neck_t,             //颈部异常文本 ,
                        spine: spine1,           // 脊柱
                        spine_str: spine_t,           //脊柱异常文本 ,
                        lymph: lymph1,            //淋巴结
                        lymph_str: lymph_t,           //淋巴结异常文本 ,
                        legs: legs1,              // 四肢
                        legs_str: legs_t,             // 四肢异常文本 ,
                        throax: throax1,         //胸部
                        throax_str: throax_t,         // 胸部异常文本 ,
                        other: other,               //外科其他记录 ,

                        alt: alt, //谷丙转氨酶ALT
                        tbil: tbil,//总胆红素TBIL(μmol/L) ,
                        hemoglobin: hemoglobin,// 血红蛋白(g/L) ,
                        other_clinical: other_clinical, //文本其他化验结果 ,

                        x_ray: x_ray,//胸部X线检查1未见异常2异常 ,
                        description: x_ray === 2 ? description : null, // 异常描述 ,

                        confirm: confirm, // 确认有无卡介苗接种史或卡痕？1有/2无 ,
                        doctor_result: doctor_result.join(''),   // 1是肺结核可疑症状者/2是肺结核密切接触者

                        need_agains: retest_name.join(),  //需要复查的项目id拼接 ,

                        clinical_no: clinical_no,   //  检验单号

                        create_time: null, //  创建时间

                        health_assessment: health_assessment === '健康良好' ? 1 : health_assessment === '患有疾病' ? 2 : 3,// 健康评价：1健康良好、2患有疾病、3身体残疾 ,
                        health_guide: health_guide,  // 健康指导文本 ,
                        main_result: main_result,  //主检结论文本 ,
                        content: content,  // 备注记录内容 ,

                        isOK: isOK === '是' ? 0 : 1,

                        qgbz: qgbz,  //右眼屈光不正
                        qgbz_left: qgbz_left,  //左眼屈光不正

                        l_d_dt: l_d_dt, ///8个数据逗号分隔
                        l_u_dt: l_u_dt, // 8个数据逗号分隔
                        r_d_dt: r_d_dt, //8个数据逗号分隔
                        r_u_dt: r_u_dt  //8个数据逗号分隔
                    };

                    this.$ajax({
                        url: urls.follow_submit,
                        data: data,
                    }).then(data => {
                        if (data.code === 200) {
                            this.$Message.success('提交成功');
                            this.$emit('modal-close', true);
                        } else {
                            this.$Message.error(data.msg);
                        }
                    }).catch(err => {
                        window.console.log(err);
                    });
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            if (this.status === 9) {
                this.disabled = true;
            }
            this.getSelectCondition();
            this.getRetestInfo();
        }
    };
</script>
<style lang="less">
    .editFollow {
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
                bottom: 10px;
                right: 31px;
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
                    padding-top: 8px !important;
                    padding-bottom: 9px !important;
                    font-size: 14px;
                    /*font-family: SourceHanSansCN-Regular;*/
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1);
                }

                .ivu-form-item {
                    margin-right: 0 !important;
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
                    /*font-family: SourceHanSansCN-Regular;*/
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
    }
</style>
