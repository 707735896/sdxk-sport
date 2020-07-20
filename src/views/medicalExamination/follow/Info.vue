<template>
    <div>
        <Modal
            :title="title1"
            :value="true"
            :width="1200"
            class="followInfo"
            :mask-closable="false"
            @on-cancel="close"
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
                            <FormItem label="证件号" class="right-label" :label-width="65">
                                <i-input v-model="obj.card_num" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="6">
                            <FormItem class="first-label" label="寄宿与否" :label-width="80">
                                <i-input v-model="obj.is_boarding" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>

                        <i-col span="18" class="dotted">
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
                            <FormItem label="民族" :label-width="80">
                                <i-input v-model="obj.nation" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <!--<i-col span="6">-->
                            <!--<FormItem class="first-label" label="体检日期" :label-width="80">-->
                                <!--<i-input v-model="obj.create_time" :disabled="flag"></i-input>-->
                            <!--</FormItem>-->
                        <!--</i-col>-->
                        <i-col span="18" class="dotted">
                            <FormItem label="残疾情况" class="right-label" :label-width="90">
                                <Tooltip :content="obj.disability" style="width: 100%;" v-if='obj.anamnesis!=null'>
                                    <i-input v-model="obj.disability" :disabled="flag"></i-input>
                                </Tooltip>
                                <i-input v-model="obj.disability" :disabled="flag"
                                         v-else></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="40">
                        <i-col span="12">
                            <h4 class="bodys"><span></span>一般</h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="6">
                                    <FormItem class="first-label" label="身高" :label-width="50">
                                        <span slot="label">身&nbsp;高</span>
                                        <i-input v-model="obj.height" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="体重" class="right-label" :label-width="50">
                                        <span slot="label">体&nbsp;重</span>
                                        <i-input v-model="obj.weight" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="5">
                                    <FormItem class="right-label" label="BMI" :label-width="50">
                                        <i-input v-model="obj.bmi" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="7">
                                    <FormItem class="pad right-label" label="课桌椅型号" :label-width="70">
                                        <span slot="label">课桌椅型号&emsp;</span>
                                        <i-input v-model="obj.desk_mat" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">生理功能</h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="8">
                                    <FormItem class="first-label" label="收缩压" :label-width="60">
                                        <span slot="label">收缩压</span>
                                        <i-input v-model="obj.sp" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="舒张压" class="first-label" :label-width="60">
                                        <span slot="label">舒张压</span>
                                        <i-input v-model="obj.dp" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="心率" class="first-label" :label-width="60">
                                        <span slot="label">心&emsp;率</span>
                                        <i-input v-model="obj.pulse" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">眼科</h4>
                            <Row>
                                <i-col span="6">
                                    <FormItem class="first-label" label="结膜" :label-width="60">
                                        <span slot="label">结&nbsp;膜</span>
                                        <i-input v-model="obj.jiem" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="角膜" class="right-label" :label-width="70">
                                        <span slot="label">角&nbsp;膜</span>
                                        <i-input v-model="obj.jiaom" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="晶体" class="right-label" :label-width="70">
                                        <span slot="label">晶&nbsp;体</span>
                                        <i-input v-model="obj.jt" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="瞳孔" class="right-label" :label-width="70">
                                        <span slot="label">瞳&nbsp;孔</span>
                                        <i-input v-model="obj.tk" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="6">
                                    <FormItem class="first-label" label="眼位" :label-width="60">
                                        <span slot="label">眼&nbsp;位</span>
                                        <i-input v-model="obj.yw" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="眼球运动" class="pad right-label" :label-width="70">
                                        <span slot="label">眼球运动&emsp;&emsp;</span>
                                        <i-input v-model="obj.yqyd" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="异常视觉行为" class="pad right-label" :label-width="70">
                                        <i-input v-model="obj.ycsjxw" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="临床印象" :label-width="60">
                                        <span slot="label">临床印象</span>
                                        <i-input v-model="obj.lcyx" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="12">
                                    <FormItem class="pad" label="戴镜情况" :label-width="60">
                                        <span slot="label">戴镜情况</span>
                                        <i-input v-model="obj.dj" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="右眼" class="right-label" :label-width="70">
                                        <span slot="label">右&nbsp;眼</span>
                                        <i-input v-model="obj.dj_r" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼" class="right-label" :label-width="70">
                                        <span slot="label">左&nbsp;眼</span>
                                        <i-input v-model="obj.dj_l" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="12">
                                    <FormItem class="pad" label="屈光度右眼" :label-width="60">
                                        <span slot="label">屈光度右眼</span>
                                        <span style="font-size:16px;">①+②-③0  <span
                                            style="font-size:12px;">球镜 (S)</span></span>
                                        <i-input v-model="obj.r_s"
                                                 style="width: 62px;position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="屈光度左眼" class="pad right-label" :label-width="70">
                                        <span slot="label">屈光度左眼&emsp;</span>
                                        <span style="font-size:16px;">①+②-③0  <span
                                            style="font-size:12px;">球镜 (S)</span></span>
                                        <i-input v-model="obj.l_s"
                                                 style="width: 62px;position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="pad" label="" :label-width="60">
                                        <span slot="label"></span>
                                        <span style="font-size:16px;">①+②-③0  <span
                                            style="font-size:12px;">柱镜 (C)</span></span>
                                        <i-input v-model="obj.r_c"
                                                 style="width: 62px;position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="" class="pad right-label" :label-width="70">
                                        <span slot="label"></span>
                                        <span style="font-size:16px;">①+②-③0  <span
                                            style="font-size:12px;">柱镜 (C)</span></span>
                                        <i-input v-model="obj.l_c"
                                                 style="width: 62px;position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="pad" label="" :label-width="60">
                                        <span slot="label"></span>
                                        <span style="font-size:15px;">轴向值（A）</span>
                                        <i-input v-model="obj.r_a"
                                                 style="width: 114px;position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="pad" label="" :label-width="60">
                                        <span slot="label"></span>
                                        <span style="font-size:15px;">轴向值（A）</span>
                                        <i-input v-model="obj.l_a"
                                                 style="width: 114px;position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="pad" label="屈光临床印象" :label-width="60">
                                        <span slot="label">屈光临床印象</span>
                                        <i-input v-model="obj.diolcyx" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem class="pad dotted1" label="角膜曲率半径" :label-width="60">
                                        <span slot="label">角膜曲率半径</span>
                                        <i-input v-model="obj.jmqlbj" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="眼轴长度" class="pad right-label dotted1 spcDot" :label-width="60">
                                        <span slot="label">眼轴长度&emsp;&emsp;</span>
                                        <i-input v-model="obj.yzcd" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="色觉" class="right-label dotted1" :label-width="60">
                                        <span slot="label">色&nbsp;觉</span>
                                        <i-input v-model="obj.sj" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="随访" :label-width="60" class="dotted1">
                                        <span slot="label">随&nbsp;访</span>
                                        <i-input v-model="obj.sf" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="转诊" :label-width="60" class="dotted1">
                                        <span slot="label">转&nbsp;诊</span>
                                        <i-input v-model="obj.zz" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">视力</h4>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="6">
                                    <FormItem class="pad" label="右眼裸眼视力" :label-width="60">
                                        <span slot="label">右眼裸眼视力</span>
                                        <i-input v-model="obj.r_eyesight" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼裸眼视力" class="pad right-label" :label-width="70">
                                        <span slot="label">左眼裸眼视力</span>
                                        <i-input v-model="obj.l_eyesight" :disabled="flag"></i-input>

                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="右眼戴镜视力" class="pad right-label" :label-width="70">
                                        <i-input v-model="obj.r_bcva" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼戴镜视力" class="pad right-label" :label-width="70">
                                        <i-input v-model="obj.l_bcva" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">口腔</h4>
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
                            <Row :gutter="16">
                                <i-col span="12">
                                    <FormItem label="龋患" class="" :label-width="60">
                                        <span slot="label">龋&emsp;患</span>
                                        <i-input v-model="obj.he_broken" style="width: 96px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_broken" style="width: 96px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="龋失" class="" :label-width="60">
                                        <span slot="label">龋&emsp;失</span>
                                        <i-input v-model="obj.he_lose" style="width: 100px;" :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_lose" style="width: 105px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter=16 style="margin-bottom: 20px!important">
                                <i-col span="12">
                                    <FormItem label="龋补" class="" :label-width="60">
                                        <span slot="label">龋&emsp;补</span>
                                        <i-input v-model="obj.he_repair" style="width: 96px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_repair" style="width: 96px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="其他记录" class="dotted1 pad" :label-width="60">
                                        <i-input v-model="obj.remark"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">检验</h4>
                            <Row :gutter="16">
                                <i-col span="12" class="">
                                    <FormItem class="first-label pad dotted2" label="谷丙转氨酶ALT" :label-width="100">
                                        <i-input v-model="obj.alt" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="总胆红素TBIL" :label-width="100" class="dotted2 pad">
                                        <i-input v-model="obj.tbil" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted2" label="血红蛋白" :label-width="100">
                                        <i-input v-model="obj.hemoglobin" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他化验结果" :label-width="100">
                                        <i-input v-model="obj.other_clinical"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">检查</h4>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="胸部X线检查" :label-width="60" class="first-label pad dotted2">
                                        <i-input v-model="obj.x_ray" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <!-- 升学体检 -->
                            <h4 class="bodys stars2" v-if="obj.phy_type=='2'">结核菌素皮肤试验检查</h4>
                            <Row v-if="obj.phy_type=='2'">
                                <i-col span="24">
                                    <FormItem label="结果判定" :label-width="80">
                                        <i-input v-model="obj.result" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </i-col>
                        <i-col span="12">
                            <h4 class="bodys">外科</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="first-label" label="皮肤" :label-width="60">
                                        <i-input v-model="obj.skin" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem class="first-label" label="头部" :label-width="60">
                                        <i-input v-model="obj.head" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="颈部" class="first-label" :label-width="60">
                                        <i-input v-model="obj.neck" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="脊柱" class="first-label" :label-width="60">
                                        <i-input v-model="obj.spine" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="淋巴结" :label-width="60">
                                        <i-input v-model="obj.lymph" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem class="first-label" label="四肢" :label-width="60">
                                        <i-input v-model="obj.legs" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="胸部" class="first-label" :label-width="60">
                                        <i-input v-model="obj.throax" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他记录" :label-width="60">
                                        <i-input v-model="obj.other"
                                                 :disabled="flag"></i-input>
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
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他症状" :label-width="60">
                                        <i-input v-model="obj.other_unwell"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="心" class="first-label" :label-width="60">
                                        <span slot="label">心&emsp;&emsp;</span>
                                        <i-input v-model="obj.heart"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="肺" class="first-label" :label-width="60">
                                        <span slot="label">肺&emsp;&emsp;</span>
                                        <i-input v-model="obj.lung"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="肝" class="first-label" :label-width="60">
                                        <span slot="label">肝&emsp;&emsp;</span>
                                        <i-input v-model="obj.liver" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="脾" class="first-label" :label-width="60">
                                        <span slot="label">脾&emsp;&emsp;</span>
                                        <i-input v-model="obj.spleen" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他记录" :label-width="60">
                                        <i-input v-model="obj.other_record"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <!-- 升学体检 -->
                            <h4 class="bodys" v-if="obj.phy_type=='2'">结核病筛查检查</h4>
                            <Row v-if="obj.phy_type=='2'" style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="确认有无卡介苗接种史或卡痕？" :label-width="230">
                                        <i-input v-model="obj.confirm" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="医生意见" :label-width="80">
                                        <i-input v-model="obj.doctor_result"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys stars">需复查项目</h4>
                            <Row style="margin-bottom: 15px!important">
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.retest_name"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">健康评价</h4>
                            <Row>
                                <i-col span="24" style="margin-bottom: 15px!important">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.health_assessment"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">本次体检结论</h4>
                            <Row>
                                <i-col span="24" class="p-content">
                                    <p v-html="obj.main_result"></p>
                                    <!--<FormItem label="" :label-width="0">-->
                                    <!--<i-input type="textarea" v-model="obj.main_result" :rows="5"-->
                                    <!--:disabled="flag"></i-input>-->
                                    <!--</FormItem>-->
                                </i-col>
                            </Row>

                            <h4 class="bodys">健康指导</h4>
                            <FormItem :label-width="0" class="p-content">
                                <p>{{obj.health_guide}}</p>
                            </FormItem>
                            <h4 class="bodys">追踪备注</h4>
                            <Row>
                                <i-col span="24" class="p-content">
                                    <p v-html="obj.content"></p>
                                    <!--<FormItem :label-width="0">-->
                                    <!--<i-input type="textarea" v-model="obj.content" :rows="5"-->
                                    <!--:disabled="flag"></i-input>-->
                                    <!--</FormItem>-->
                                </i-col>
                            </Row>
                        </i-col>
                    </Row>
                </Form>
<!--                <span class="sub-tip">苏州市疾病预防控制中心</span>-->
            </div>
            <div slot="footer" style="padding-top: 10px;">
                <button type="button" class="close" @click='close'>关闭</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        name: 'Edit',
        props: ['plan_code', 'year', 'student_code', 'title', 'flag', 'student_id', 'status'],
        data() {
            return {
                title1: this.title,             //个人体检详细信息
                obj: {
                    school_name: '',
                    grade_name: '',
                    class_name: '',
                    student_name: '',
                    gender: '',
                    anamnesis: '',
                    card_num: '',
                    past_medical: '',
                    friend_have: '',
                    have_touch: '',
                    create_time: '',
                    other_symptoms: '',
                    main_symptoms: '',
                    phy_type: '',  //判断升学体检和入学体检
                    health_guide: ''
                },
            };
        },
        methods: {
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
                        this.obj.school_name = _data.school_name || _data.dep_id;
                        this.obj.grade_name = _data.grade_name;
                        this.obj.class_name = _data.class_name;
                        this.obj.student_name = _data.student_name;
                        if (_data.gender) {
                            this.obj.gender = _data.gender === 1 ? '男' : '女';
                        }

                        this.obj.is_boarding = _data.is_boarding == '1' ? '是' : '否';
                        this.obj.nation = _data.nation ? _data.nation : '汉';
                        this.obj.card_num = _data.card_num;
                        this.obj.desk_mat = _data.desk_mat;

                        // if(_data.grade_no === '82649A1FDF56EA7EE050007F01001901' || _data.grade_no==='82649A1FDF50EA7EE050007F01001901'
                        //     ||_data.grade_no === '82649A1FDF5AEA7EE050007F01001901'){
                        //     this.obj.phy_type = '2';
                        //     this.title1 = '学生升学检查复测';
                        // }else {
                        //     this.obj.phy_type = '1';
                        //     this.title1 = '学生健康体检复测';
                        // }

                        //既往病史
                        this.obj.anamnesis = _data.anamnesis ? _data.anamnesis : '无';
                        this.obj.create_time = _data.create_time;
                        this.obj.disability = _data.disability ? _data.disability : '无';


                        //形体
                        this.obj.height = _data.height ? _data.height + ' cm' : '';
                        this.obj.weight = _data.weight ? _data.weight + ' kg' : '';
                        // this.obj.bmi = _data.bmi;
                        let height = _data.height / 100;
                        this.obj.bmi = (_data.weight / (height * height)).toFixed(2);

                        //生理功能
                        this.obj.sp = _data.sp ? _data.sp + ' mmHg' : '';
                        this.obj.dp = _data.dp ? _data.dp + ' mmHg' : '';
                        this.obj.pulse = _data.pulse ? _data.pulse + ' 次/分钟' : '';

                        //外科
                        if(_data.skin == 1){
                            this.obj.skin = '正常';
                        }else {
                            this.obj.skin = _data.skin_str;
                        }


                        // if (_data.skin) {
                        //     switch (_data.skin) {
                        //         case 1:
                        //             this.obj.skin = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.skin = '潮红';
                        //             break;
                        //         case 3:
                        //             this.obj.skin = '苍白';
                        //             break;
                        //         case 4:
                        //             this.obj.skin = '发绀';
                        //             break;
                        //         case 5:
                        //             this.obj.skin = '黄染';
                        //             break;
                        //         case 6:
                        //             this.obj.skin = '色素沉着';
                        //             break;
                        //         case 7:
                        //             this.obj.skin = '湿疹';
                        //             break;
                        //         case 8:
                        //             this.obj.skin = '糜烂';
                        //             break;
                        //         case 9:
                        //             this.obj.skin = _data.skin_str ? '其他，' + _data.skin_str : '';
                        //             break;
                        //         default:
                        //             this.obj.skin = '';
                        //     }
                        // } else {
                        //     this.obj.skin = '';
                        // }

                        if(_data.lymph == 1){
                            this.obj.lymph = '未触及';
                        }else {
                            this.obj.lymph = _data.lymph_str;
                        }
                        // if (_data.lymph) {
                        //     switch (_data.lymph) {
                        //         case 1:
                        //             this.obj.lymph = '未触及';
                        //             break;
                        //         case 2:
                        //             this.obj.lymph = '锁骨上';
                        //             break;
                        //         case 3:
                        //             this.obj.lymph = '腋窝';
                        //             break;
                        //         case 4:
                        //             this.obj.lymph = _data.lymph_str ? '其他，' + _data.lymph_str : '';
                        //             break;
                        //         default:
                        //             this.obj.lymph = '';
                        //     }
                        // } else {
                        //     this.obj.lymph = '';
                        // }

                        if(_data.head == 1){
                            this.obj.head = '正常';
                        }else {
                            this.obj.head = _data.head_str;
                        }
                        // this.obj.head = _data.head_str;
                        // if (_data.head) {
                        //     switch (_data.head) {
                        //         case 1:
                        //             this.obj.head = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.head = '耳郭畸形';
                        //             break;
                        //         case 3:
                        //             this.obj.head = '头部外伤';
                        //             break;
                        //         case 4:
                        //             this.obj.head = _data.head_str ? '其他，' + _data.head_str : '';
                        //             break;
                        //         default:
                        //             this.obj.head = '';
                        //     }
                        // } else {
                        //     this.obj.head = '';
                        // }

                        if(_data.neck == 1){
                            this.obj.neck = '正常';
                        }else {
                            this.obj.neck = _data.neck_str;
                        }
                        // this.obj.neck = _data.neck_str;
                        // if (_data.neck) {
                        //     switch (_data.neck) {
                        //         case 1:
                        //             this.obj.neck = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.neck = '甲状腺肿大';
                        //             break;
                        //         case 3:
                        //             this.obj.neck = '颈部外伤';
                        //             break;
                        //         case 4:
                        //             this.obj.neck = _data.neck_str ? '其他，' + _data.neck_str : '';
                        //             break;
                        //         default:
                        //             this.obj.neck = '';
                        //     }
                        // } else {
                        //     this.obj.neck = '';
                        // }

                        if(_data.spine == 1){
                            this.obj.spine = '正常';
                        }else {
                            this.obj.spine = _data.spine_str;
                        }
                        // this.obj.spine = _data.spine_str;
                        // if (_data.spine) {
                        //     switch (_data.spine) {
                        //         case 1:
                        //             this.obj.spine = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.spine = '脊柱侧弯';
                        //             break;
                        //         case 3:
                        //             this.obj.spine = '脊柱矫正中';
                        //             break;
                        //         case 4:
                        //             this.obj.spine = '脊柱术后';
                        //             break;
                        //         case 5:
                        //             this.obj.spine = '脊柱呈S形';
                        //             break;
                        //         case 6:
                        //             this.obj.spine = '脊柱后凸';
                        //             break;
                        //         case 7:
                        //             this.obj.spine = _data.spine_str ? '其他，' + _data.spine_str : '';
                        //             break;
                        //         default:
                        //             this.obj.spine = '';
                        //     }
                        // } else {
                        //     this.obj.spine = '';
                        // }

                        if(_data.legs == 1){
                            this.obj.legs = '正常';
                        }else {
                            this.obj.legs = _data.legs_str;
                        }
                        // this.obj.legs = _data.legs_str;
                        // if (_data.legs) {
                        //     switch (_data.legs) {
                        //         case 1:
                        //             this.obj.legs = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.legs = '骨折';
                        //             break;
                        //         case 3:
                        //             this.obj.legs = '先天畸形';
                        //             break;
                        //         case 4:
                        //             this.obj.legs = '扁平足';
                        //             break;
                        //         case 5:
                        //             this.obj.legs = '跛行';
                        //             break;
                        //         case 6:
                        //             this.obj.legs = _data.legs_str ? '其他，' + _data.legs_str : '';
                        //             break;
                        //         default:
                        //             this.obj.legs = '';
                        //     }
                        // } else {
                        //     this.obj.legs = '';
                        // }

                        if(_data.throax == 1){
                            this.obj.throax = '正常';
                        }else {
                            this.obj.throax = _data.throax_str;
                        }
                        // this.obj.throax = _data.throax_str;
                        // if (_data.throax) {
                        //     switch (_data.throax) {
                        //         case 1:
                        //             this.obj.throax = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.throax = '桶装胸';
                        //             break;
                        //         case 3:
                        //             this.obj.throax = '扁平胸';
                        //             break;
                        //         case 4:
                        //             this.obj.throax = '鸡胸';
                        //             break;
                        //         case 5:
                        //             this.obj.throax = '漏斗胸';
                        //             break;
                        //         case 6:
                        //             this.obj.throax = _data.throax_str ? '其他，' + _data.throax_str : '';
                        //             break;
                        //         default:
                        //             this.obj.throax = '';
                        //     }
                        // } else {
                        //     this.obj.throax = '';
                        // }

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

                        let arr2 = _data.doctor_result ? String(_data.doctor_result).split('') : [];
                        let doctor_result = arr2.map(item => {
                            switch (item) {
                                case '1':
                                    return '肺结核可疑症状者';
                                case '2':
                                    return '肺结核密切接触者';
                                case '3':
                                    return '不是肺结核可疑症状者';
                                case '4':
                                    return '不是肺结核密切接触者';
                                default:
                                    return '';
                            }
                        });
                        this.obj.doctor_result = doctor_result.join();

                        //检验科
                        this.obj.alt = _data.alt ? _data.alt + ' (U/L)' : '';
                        this.obj.tbil = _data.tbil ? _data.tbil + ' (g/L)' : '';
                        this.obj.hemoglobin = _data.hemoglobin ? _data.hemoglobin + ' (umol/L)' : '';
                        this.obj.other_clinical = _data.other_clinical ? _data.other_clinical : '无';

                        //皮肤测试检查
                        if (_data.result) {
                            switch (_data.result) {
                                case 1:
                                    this.obj.result = '阴性';
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
                            0: '异常',
                            2: '异常'
                        };
                        this.obj.jiem = obj1[_data.jiem];
                        this.obj.jiaom = obj1[_data.jiaom];
                        this.obj.jt = obj1[_data.jt];
                        this.obj.tk = obj1[_data.tk];
                        this.obj.yw = obj1[_data.yw];
                        this.obj.yqyd = obj1[_data.yqyd];
                        this.obj.ycsjxw = _data.ycsjxw;

                        this.obj.lcyx = _data.lcyx;
                        this.obj.diolcyx = _data.diolcyx;
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
                        this.obj.r_eyesight = _data.r_eyesight ? Number(_data.r_eyesight).toFixed(1) : '';
                        this.obj.l_eyesight = _data.l_eyesight ? Number(_data.l_eyesight).toFixed(1) : '';
                        this.obj.r_bcva = _data.r_bcva ? Number(_data.r_bcva).toFixed(1) : '';
                        this.obj.l_bcva = _data.l_bcva ? Number(_data.l_bcva).toFixed(1) : '';

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
                        // let arr = _data.recent_unwell?_data.recent_unwell.split(','):[];
                        // let recent_unwell = arr.map(item => {
                        //     switch(item){
                        //         case "1":
                        //             return '疲乏无力';
                        //         case "2":
                        //             return '低热';
                        //         case "3":
                        //             return '盗汗';
                        //         case "4":
                        //             return '胸痛' ;
                        //         case "5":
                        //             return '咳嗽' ;
                        //         case "6":
                        //             return '咳痰';
                        //         case "7":
                        //             return '食欲减退';
                        //         case "8":
                        //             return '消瘦';
                        //     }
                        // });
                        this.obj.recent_unwell = _data.recent_unwell? _data.recent_unwell:'无';


                        this.obj.other_unwell = _data.other_unwell ? _data.other_unwell : '无';

                        if(_data.heart == 1){
                            this.obj.heart = '正常';
                        }else {
                            this.obj.heart = _data.heart_str;
                        }
                        // this.obj.heart = _data.heart_str;
                        // if (_data.heart) {
                        //     switch (_data.heart) {
                        //         case 1:
                        //             this.obj.heart = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.heart = '心脏杂音';
                        //             break;
                        //         case 3:
                        //             this.obj.heart = '心律不齐';
                        //             break;
                        //         case 4:
                        //             this.obj.heart = _data.heart_str ? '其他，' + _data.heart_str : '';
                        //             break;
                        //         default:
                        //             this.obj.heart = '';
                        //     }
                        // } else {
                        //     this.obj.heart = '';
                        // }

                        if(_data.lung == 1){
                            this.obj.lung = '正常';
                        }else {
                            this.obj.lung = _data.lung_str;
                        }
                        // this.obj.lung = _data.lung_str;
                        // if (_data.lung) {
                        //     switch (_data.lung) {
                        //         case 1:
                        //             this.obj.lung = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.lung = '哮鸣声';
                        //             break;
                        //         case 3:
                        //             this.obj.lung = '干啰音';
                        //             break;
                        //         case 4:
                        //             this.obj.lung = '湿啰音';
                        //             break;
                        //         case 5:
                        //             this.obj.lung = _data.lung_str ? '其他，' + _data.lung_str : '';
                        //             break;
                        //         default:
                        //             this.obj.lung = '';
                        //     }
                        // } else {
                        //     this.obj.lung = '';
                        // }

                        //肝

                        if(_data.liver == 1){
                            this.obj.liver = '正常';
                        }else {
                            this.obj.liver = _data.liver_str;
                        }
                        // this.obj.liver = _data.liver_str;
                        // if (_data.liver) {
                        //     switch (_data.liver) {
                        //         case 1:
                        //             this.obj.liver = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.liver = '肝肿大';
                        //             break;
                        //         case 3:
                        //             this.obj.liver = '肝区压痛';
                        //             break;
                        //         case 4:
                        //             this.obj.liver = _data.liver_str ? '其他，' + _data.liver_str : '';
                        //             break;
                        //         default:
                        //             this.obj.liver = '';
                        //     }
                        // } else {
                        //     this.obj.liver = '';
                        // }

                        //脾
                        if(_data.spleen == 1){
                            this.obj.spleen = '正常';
                        }else {
                            this.obj.spleen = _data.spleen_str;
                        }
                        // this.obj.spleen = _data.spleen_str;
                        // if (_data.spleen) {
                        //     switch (_data.spleen) {
                        //         case 1:
                        //             this.obj.spleen = '正常';
                        //             break;
                        //         case 2:
                        //             this.obj.spleen = '脾肿大';
                        //             break;
                        //         case 3:
                        //             this.obj.spleen = '脾区压痛';
                        //             break;
                        //         case 4:
                        //             this.obj.spleen = _data.spleen_str ? '其他，' + _data.spleen_str : '';
                        //             break;
                        //         default:
                        //             this.obj.spleen = '';
                        //     }
                        // } else {
                        //     this.obj.spleen = '';
                        // }
                        this.obj.other_record = _data.other_record ? _data.other_record : '无';


                        //主检
                        this.obj.main_result = _data.main_result;
                        this.obj.retest_name = _data.retest_name;
                        if (_data.health_assessment) {
                            if (_data.health_assessment === 1) {
                                this.obj.health_assessment = '健康良好';
                            } else if (_data.health_assessment === 2) {
                                this.obj.health_assessment = '患有疾病';
                            } else if (_data.health_assessment === 3) {
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
                })
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
    .followInfo {
        .dotted, .dotted1 {
            position: relative;
        }

        .dotted1 .ivu-form-item-label, .dotted2 .ivu-form-item-label {
            position: relative;

            &:after {
                position: absolute;
                content: '*';
                color: #000;
                height: 10px;
                width: 10px;
            }
        }

        .dotted2 .ivu-form-item-label:after {
            content: '**';
        }

        .spcDot .ivu-form-item-label:after {
            left: 26px;
        }

        .dotted:after {
            position: absolute;
            top: 0;
            left: 80px;
            content: '*';
            color: #000;
            height: 10px;
            width: 10px;
        }

        .ivu-modal {
            min-width: 1100px;

            .ivu-modal-body {
                position: relative;
                padding: 20px 25px 10px 25px !important;
            }

            .sub-tip {
                position: absolute;
                bottom: -20px;
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

                .left-label .ivu-form-item-label {
                    text-align: left;
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

            .pad .ivu-form-item-label {
                padding: 2px 12px 0 0 !important;
            }

            .bodys {
                font-size: 20px;
                margin-bottom: 12px;
                /*font-family: SourceHanSansCN-Medium;*/
                font-weight: 500;
                color: rgba(0, 0, 0, 1);
            }

            .stars {
                position: relative;

                &:after {
                    position: absolute;
                    content: '*';
                    height: 10px;
                    width: 10px;
                    font-weight: 700;
                }

            }

            .stars2 {
                position: relative;

                &:after {
                    position: absolute;
                    content: '**';
                    height: 10px;
                    width: 10px;
                    font-weight: 700;
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
                    right: 0px !important;
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


