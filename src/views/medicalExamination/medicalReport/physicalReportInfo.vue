<template>
    <div>
        <Modal
            :title="title1"
            :value="true"
            :width="1200"
            class="editTest"
            :mask-closable="false"
            @on-cancel="close"
        >
            <div style="position: relative;margin-bottom:50px">
                <Form ref="obj" label-position="left">
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
                            <FormItem class="first-label" label="体检日期" :label-width="80">
                                <i-input v-model="obj.create_time" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
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
                    <Row :gutter="60">
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
                                    <FormItem label="体重" class="right-label" :label-width="60">
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
                                        <i-input v-model="obj.sp"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="舒张压" class="first-label" :label-width="60">
                                        <span slot="label">舒张压</span>
                                        <i-input v-model="obj.dp"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="心 率" class="first-label" :label-width="60">
                                        <span slot="label">心&emsp;率</span>
                                        <i-input v-model="obj.pulse"
                                                 :disabled="flag"></i-input>
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
                                                 style="width: 114px; position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="pad" label="" :label-width="60">
                                        <span slot="label"></span>
                                        <span style="font-size:15px;">轴向值（A）</span>
                                        <i-input v-model="obj.l_a" style="width: 114px;position: absolute;right: 0;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <!-- <i-col span="12">
                                    <FormItem class="pad" label="" :label-width="60">
                                        <span slot="label"></span>
                                        <span style="font-size:15px;">屈光不正</span>
                                        <i-input v-model="obj.qgbz" style="width: 110px;    position: absolute;right: 8px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem class="pad" label="" :label-width="60">
                                        <span slot="label"></span>
                                        <span style="font-size:15px;">屈光不正</span>
                                        <i-input v-model="obj.qgbz_left" style="width: 110px;    position: absolute;right: 8px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col> -->

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
                                        <i-input v-model="obj.r_eyesight"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="6">
                                    <FormItem label="左眼裸眼视力" class="pad right-label" :label-width="70">
                                        <span slot="label">左眼裸眼视力</span>
                                        <i-input v-model="obj.l_eyesight"
                                                 :disabled="flag"></i-input>

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
                                <i-col span="7">
                                    <FormItem class="first-label" label="齿列" :label-width="60">
                                        <span slot="label">齿&emsp;列</span>
                                        <i-input v-model="obj.dentition"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="7">
                                    <FormItem label="牙周" class="right-label" :label-width="60">
                                        <span slot="label">牙&emsp;周</span>
                                        <i-input v-model="obj.periodontal"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="10">
                                    <FormItem label="有无龋齿" class="right-label" :label-width="80">
                                        <span slot="label">有无龋齿</span>
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
                                        <i-input v-model="obj.he_broken" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_broken" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="龋失" class="" :label-width="60">
                                        <span slot="label">龋&emsp;失</span>
                                        <i-input v-model="obj.he_lose" style="width: 98px;" :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_lose" style="width: 98px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="12">
                                    <FormItem label="龋补" class="" :label-width="60">
                                        <span slot="label">龋&emsp;补</span>
                                        <i-input v-model="obj.he_repair" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_repair" style="width: 98px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="其他记录" class="pad dotted1" :label-width="60">
                                        <i-input v-model="obj.kqremark"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">检验</h4>
                            <Row :gutter="16">
                                <i-col span="12">
                                    <FormItem class="pad first-label dotted2" label="谷丙转氨酶ALT" :label-width="100">
                                        <i-input v-model="obj.alt" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="总胆红素TBIL" :label-width="100" class="pad dotted2">
                                        <i-input v-model="obj.tbil" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="first-label dotted2" label="血红蛋白" :label-width="100">
                                        <i-input v-model="obj.hemoglobin"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <!-- <i-col span="2">
                                    <FormItem label="结核菌素试验" :label-width="110">
                                        <i-input v-model="obj.result" style="width: 120px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col> -->
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
                            <h4 class="bodys">结核菌素皮肤试验检查</h4>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="结果判定" :label-width="60" class="first-label pad dotted2">
                                        <i-input v-model="obj.tuberCondition" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <!-- 升学体检 -->
                            <h4 class="bodys stars2" v-if="obj.phy_type==2">结核菌素皮肤试验检查</h4>
                            <Row v-if="obj.phy_type==2">
                                <i-col span="24">
                                    <FormItem v-if="obj.examine === 1" label="结果判定" :label-width="80">
                                        <i-input v-model="obj.result" :disabled="flag"></i-input>
                                    </FormItem>
                                    <FormItem v-else label="异常原因备注" class="pad" :label-width="80">
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
                                        <i-input v-model="obj.skin_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem class="first-label" label="头部" :label-width="60">
                                        <i-input v-model="obj.head_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="颈部" class="first-label" :label-width="60">
                                        <i-input v-model="obj.neck_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="脊柱" class="first-label" :label-width="60">
                                        <i-input v-model="obj.spine_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="淋巴结" :label-width="60">
                                        <i-input v-model="obj.lymph_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem class="first-label" label="四肢" :label-width="60">
                                        <i-input v-model="obj.legs_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="胸部" class="first-label" :label-width="60">
                                        <i-input v-model="obj.throax_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他记录" :label-width="60">
                                        <i-input v-model="obj.other" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">内科</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="first-label pad" label="近期不适症状" :label-width="60">
                                        <i-input v-model="obj.recent_unwell" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他症状" :label-width="60">
                                        <i-input v-model="obj.other_unwell" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <!-- <i-col span="7">
                                    <FormItem label="心率(次/分钟)" class="first-label pad" :label-width="60">
                                        <span slot="label">心&emsp;率(次/分)</span>
                                        <i-input v-model="obj.heart_rate" style="width: 80px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col> -->
                                <!-- <i-col span="24">
                                    <FormItem label="心脏杂音" class="pad first-label" :label-width="60">
                                        <span slot="label">心脏杂音&emsp;&emsp;</span>
                                        <i-input v-model="obj.cardiac_souffle" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col> -->
                                <i-col span="24">
                                    <FormItem label="心" class="first-label" :label-width="60">
                                        <span slot="label">心&emsp;&emsp;</span>
                                        <i-input v-model="obj.heart_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="肺" class="first-label" :label-width="60">
                                        <span slot="label">肺&emsp;&emsp;</span>
                                        <i-input v-model="obj.lung_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="肝" class="first-label" :label-width="60">
                                        <span slot="label">肝&emsp;&emsp;</span>
                                        <i-input v-model="obj.liver_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="脾" class="first-label" :label-width="60">
                                        <span slot="label">脾&emsp;&emsp;</span>
                                        <i-input v-model="obj.spleen_str" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem class="first-label pad dotted1" label="其他记录" :label-width="60">
                                        <i-input v-model="obj.other_record" style="width: 480px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <!-- 升学体检 -->
                            <h4 class="bodys" v-if="obj.phy_type==2">结核病筛查检查</h4>
                            <Row v-if="obj.phy_type==2" style="margin-bottom: 20px!important">
                                <i-col span="24">
                                    <FormItem label="确认有无卡介苗接种史或卡痕？" :label-width="230">
                                        <i-input v-model="obj.confirm" style="width: 307px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="医生意见" :label-width="80">
                                        <i-input v-model="obj.doctor_result" style="width: 457px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys stars">需复查项目</h4>
                            <Row style="margin-bottom: 15px!important">
                                <i-col span="12">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.retest_name" style="width: 540px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">健康评价</h4>
                            <Row style="margin-bottom: 15px!important">
                                <i-col span="12">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.health_assessment" style="width: 540px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <h4 class="bodys">本次体检结论</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <Input type="textarea" v-model="obj.main_result" :rows="5"
                                               style="width: 540px;height:auto" :disabled="flag"/>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">健康指导</h4>
                            <FormItem :label-width="0" class="p-content">
                                <p style="white-space: pre-line;">{{obj.health_guide}}</p>
                            </FormItem>
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
        name: 'physicalReportInfo',
        props: ['plan_code', 'year', 'student_code', 'title', 'flag', 'student_id'],
        data() {
            return {
                title1: this.title,             //个人体检详细信息
                obj: {
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
                    create_time: '',
                    other_symptoms: '',
                    main_symptoms: '',
                    phy_type: '',  //判断升学体检和入学体检
                    health_guide: ''
                },

                gradeList: [],
                is_manage: true,
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
                    1: '不戴镜 *',
                    2: '佩戴框架眼镜 *',
                    3: '佩戴隐形眼镜 *',
                    4: '配戴角膜塑形镜 *'
                },
                // 医生意见
                docCondition: {
                    1: '是肺结核可疑症状者',
                    2: '是肺结核密切接触者',
                    3: '不是肺结核可疑症状者',
                    4: '不是肺结核密切接触者'

                }
            };
        },
        methods: {
            //复测个人信息详情
            getRetestInfo() {
                this.$ajax({
                    url: urls.retest_single_info,
                    data: {
                        student_id: this.student_id,
                        type: 2
                    }
                }).then(data => {
                    let obj1 = {
                        1: '正常',
                        0: '异常',
                        2: '异常'
                    };
                    if (data.code === 200) {
                        let _data = data.data;
                        this.obj.dep_id = _data.dep_id;
                        this.obj.grade_name = _data.grade_name;
                        this.obj.class_name = _data.class_name;
                        this.obj.student_name = _data.student_name;
                        this.obj.card_num = _data.card_num;
                        this.obj.other_symptoms = _data.other_symptoms;
                        this.obj.main_symptoms = _data.main_symptoms;
                        this.obj.phy_type = _data.phy_type;
                        this.obj.desk_mat = _data.desk_mat;
                        this.title1 = this.obj.phy_type == '2' ? '学生升学检查报告详情' : '学生健康体检报告详情';
                        // this.$emit('update:title', newtableData)

                        //既往病史
                        this.obj.anamnesis = _data.anamnesis ? _data.anamnesis : '无';
                        //基础信息
                        this.obj.create_time = _data.mainInspects.length !== 0 ? _data.mainInspects[0].create_time : '';
                        this.obj.gender = _data.gender === 1 ? '男' : '女';
                        this.obj.is_boarding = _data.is_boarding == '1' ? '是' : '否';
                        this.obj.past_medical = _data.past_medical === 1 ? '有' : '无';
                        this.obj.friend_have = _data.friend_have === 1 ? '有' : '无';
                        this.obj.have_touch = _data.have_touch === 1 ? '有' : '无';
                        this.obj.nation = _data.nation ? _data.nation : '汉';
                        this.obj.disability = _data.disability ? _data.disability : '无';

                        //形体
                        if (_data.physicalExamRecords.length !== 0) {
                            this.obj.height = _data.physicalExamRecords[0].height ? _data.physicalExamRecords[0].height + ' cm' : '';
                            this.obj.weight = _data.physicalExamRecords[0].weight ? _data.physicalExamRecords[0].weight + ' kg' : '';
                            this.obj.bmi = _data.physicalExamRecords[0].bmi;
                        }
                        //生理功能
                        if (_data.physicalFunctions && _data.physicalFunctions.length !== 0) {
                            this.obj.sp = _data.physicalFunctions[0].sp ? _data.physicalFunctions[0].sp + ' mmHg' : '';
                            this.obj.dp = _data.physicalFunctions[0].dp ? _data.physicalFunctions[0].dp + ' mmHg' : '';
                            this.obj.pulse = _data.physicalFunctions[0].pulse ? _data.physicalFunctions[0].pulse + ' 次/分钟' : '';
                        }
                        //外科
                        if (_data.surgerys && _data.surgerys.length > 0) {
                            const surgerys = _data.surgerys[0];
                            if (surgerys.skin == 1) {
                                this.obj.skin_str = '正常';
                            } else {
                                this.obj.skin_str = surgerys.skin_str;
                            }

                            if (surgerys.lymph == 1) {
                                this.obj.lymph_str = '未触及';
                            } else {
                                this.obj.lymph_str = surgerys.lymph_str;
                            }

                            if (surgerys.throax == 1) {
                                this.obj.throax_str = '正常';
                            } else {
                                this.obj.throax_str = surgerys.throax_str;
                            }

                            if (surgerys.head == 1) {
                                this.obj.head_str = '正常';
                            } else {
                                this.obj.head_str = surgerys.head_str;
                            }

                            if (surgerys.neck == 1) {
                                this.obj.neck_str = '正常';
                            } else {
                                this.obj.neck_str = surgerys.neck_str;
                            }

                            if (surgerys.spine == 1) {
                                this.obj.spine_str = '正常';
                            } else {
                                this.obj.spine_str = surgerys.spine_str;
                            }

                            if (surgerys.legs == 1) {
                                this.obj.legs_str = '正常';
                            } else {
                                this.obj.legs_str = surgerys.legs_str;
                            }
                            // this.obj.skin_str = _data.surgerys[0].skin_str;
                            // this.obj.lymph_str = _data.surgerys[0].lymph_str;
                            // this.obj.throax_str = _data.surgerys[0].throax_str;

                            //头部、颈部、脊柱、四肢
                            // if (_data.surgerys[0].head_str != null) {
                            //     this.obj.head_str = _data.surgerys[0].head_str;
                            // }
                            // if (_data.surgerys[0].neck_str != null) {
                            //     this.obj.neck_str = _data.surgerys[0].neck_str;
                            // }
                            // if (_data.surgerys[0].spine_str != null) {
                            //     this.obj.spine_str = _data.surgerys[0].spine_str;
                            // }
                            // if (_data.surgerys[0].legs_str != null) {
                            //     this.obj.legs_str = _data.surgerys[0].legs_str;
                            // }
                            this.obj.other = _data.surgerys[0].other ? _data.surgerys[0].other : '无';
                        }
                        //结核病筛查检查
                        if (_data.tuberculosiss && _data.tuberculosiss.length > 0) {

                            if (_data.tuberculosiss[0].confirm != null) {
                                this.obj.confirm = _data.tuberculosiss[0].confirm === 1 ? '有' : '无';
                            }

                            if (_data.tuberculosiss[0].doctor_result != null) {
                                let firNum = parseInt(_data.tuberculosiss[0].doctor_result / 10);
                                let seNum = _data.tuberculosiss[0].doctor_result % 10;
                                firNum = this.getDetailCondition(firNum, 9);
                                seNum = this.getDetailCondition(seNum, 9);
                                this.obj.doctor_result = `${firNum}，${seNum}`;
                            }

                        }
                        //检验科
                        if (_data.clinicalLabs && _data.clinicalLabs.length > 0) {
                            this.obj.alt = _data.clinicalLabs[0].alt ? _data.clinicalLabs[0].alt + ' (U/L)' : '';
                            this.obj.tbil = _data.clinicalLabs[0].tbil ? _data.clinicalLabs[0].tbil + ' (g/L)' : '';
                            this.obj.hemoglobin = _data.clinicalLabs[0].hemoglobin ? _data.clinicalLabs[0].hemoglobin + ' (umol/L)' : '';
                            this.obj.other_clinical = _data.clinicalLabs[0].other_clinical ? _data.clinicalLabs[0].other_clinical : '无';
                        }
                        //皮肤测试检查
                        if (_data.skinTests && _data.skinTests.length > 0) {
                            // this.obj.tuberCondition = _data.skinTests[0].result;
                            // if (_data.skinTests[0].result === 1) {//正常检查
                                this.obj.tuberCondition = this.getDetailCondition(_data.skinTests[0].result, 5);
                            // } else if (_data.skinTests[0].result === 2) {//异常不检查
                            //     this.obj.result = _data.skinTests[0].remark;
                            // } else {
                            //     this.obj.result = '无';
                            // }

                        } else {
                            this.obj.tuberCondition = '';
                        }

                        //眼科
                        if (_data.newophthalmologys && _data.newophthalmologys.length > 0) {
                            const mologys = _data.newophthalmologys[0];

                            //结膜
                            this.obj.jiem = obj1[mologys.jiem];
                            this.obj.jt = obj1[mologys.jt];
                            this.obj.yw = obj1[mologys.yw];
                            this.obj.jiaom = obj1[mologys.jiaom];
                            this.obj.tk = obj1[mologys.tk];
                            this.obj.yqyd = obj1[mologys.yqyd];
                            this.obj.sj = obj1[mologys.sj];
                            this.obj.ycsjxw = _data.newophthalmologys[0].ycsjxw;
                            // if(_data.newophthalmologys[0].qtycsjxw) {
                            //     this.obj.ycsjxw = this.obj.ycsjxw + ' 其他('+_data.newophthalmologys[0].qtycsjxw+')';
                            // }
                            this.obj.lcyx = _data.newophthalmologys[0].lcyx;
                            this.obj.diolcyx = _data.newophthalmologys[0].diolcyx;
                            // if(_data.newophthalmologys[0].qtlcyx) {
                            //     this.obj.lcyx = this.obj.lcyx+' 其他('+_data.newophthalmologys[0].qtlcyx+')';
                            // }

                            this.obj.sf = _data.newophthalmologys[0].sf;
                            this.obj.zz = _data.newophthalmologys[0].zz;

                            this.obj.dj_r = _data.newophthalmologys[0].dj_r ? `${_data.newophthalmologys[0].dj_r}D *` : '';
                            this.obj.dj_l = _data.newophthalmologys[0].dj_l ? `${_data.newophthalmologys[0].dj_l}D *` : '';
                            this.obj.jmqlbj = _data.newophthalmologys[0].jmqlbj ? `${_data.newophthalmologys[0].jmqlbj}mm` : '';
                            this.obj.yzcd = _data.newophthalmologys[0].yzcd ? `${_data.newophthalmologys[0].yzcd}mm` : '';

                            this.obj.r_a = _data.newophthalmologys[0].r_a ? `${_data.newophthalmologys[0].r_a}°` : '';
                            this.obj.l_a = _data.newophthalmologys[0].l_a ? `${_data.newophthalmologys[0].l_a}°` : '';
                            this.obj.r_s = _data.newophthalmologys[0].r_s ? `${_data.newophthalmologys[0].r_s}D` : '';
                            this.obj.l_s = _data.newophthalmologys[0].l_s ? `${_data.newophthalmologys[0].l_s}D` : '';
                            this.obj.r_c = _data.newophthalmologys[0].r_c ? `${_data.newophthalmologys[0].r_c}D` : '';
                            this.obj.l_c = _data.newophthalmologys[0].l_c ? `${_data.newophthalmologys[0].l_c}D` : '';

                            this.obj.qgbz = this.getDetailCondition(_data.newophthalmologys[0].qgbz, 6);
                            this.obj.qgbz_left = this.getDetailCondition(_data.newophthalmologys[0].qgbz_left, 6);
                            // this.obj.lcyx = this.getDetailCondition(_data.newophthalmologys[0].lcyx,7);
                            this.obj.dj = this.getDetailCondition(_data.newophthalmologys[0].dj, 8);
                        }
                        //视力
                        if (_data.eyesights && _data.eyesights.length > 0) {
                            const eyesights = _data.eyesights[0];
                            this.obj.r_eyesight = eyesights.r_eyesight ? eyesights.r_eyesight.toFixed(1) : '';
                            this.obj.l_eyesight = eyesights.l_eyesight ? eyesights.l_eyesight.toFixed(1) : '';
                            this.obj.r_bcva = eyesights.r_bcva ? eyesights.r_bcva.toFixed(1) : '';
                            this.obj.l_bcva = eyesights.l_bcva ? eyesights.l_bcva.toFixed(1) : '';
                        }
                        //口腔科

                        if (_data.stomatologys && _data.stomatologys.length > 0) {
                            const stomatologys = _data.stomatologys[0];
                            this.obj.he_broken = stomatologys.he_broken || stomatologys.he_broken === 0 ? `恒牙${stomatologys.he_broken}` : '0';
                            this.obj.he_lose = stomatologys.he_lose || stomatologys.he_lose === 0 ? `恒牙${stomatologys.he_lose}` : '0';
                            this.obj.he_repair = stomatologys.he_repair || stomatologys.he_repair === 0 ? `恒牙${stomatologys.he_repair}` : '0';
                            this.obj.ru_broken = stomatologys.ru_broken || stomatologys.ru_broken === 0 ? `乳牙${stomatologys.ru_broken}` : '0';
                            this.obj.ru_lose = stomatologys.ru_lose || stomatologys.ru_lose === 0 ? `乳牙${stomatologys.ru_lose}` : '0';
                            this.obj.ru_repair = stomatologys.ru_repair || stomatologys.ru_repair === 0 ? `乳牙${stomatologys.ru_repair}` : '0';

                            if (stomatologys.dentition != null) {
                                this.obj.dentition = stomatologys.dentition === 1 ? '整齐' : '不齐';
                                this.obj.periodontal = stomatologys.periodontal === 1 ? '正常' : '异常';
                            }
                            if (stomatologys.decayed_tooth != null) {
                                this.obj.decayed_tooth = stomatologys.decayed_tooth === 1 ? '无' : '有';
                            } else {
                                this.obj.decayed_tooth = '无';
                            }
                            this.obj.kqremark = stomatologys.remark ? stomatologys.remark : '无';
                            //牙周
                            // this.obj.periodontal = this.getDetailCondition(_data.stomatologys[0].periodontal, 4);
                        }

                        //内科
                        if (_data.internals && _data.internals.length > 0) {

                            this.obj.recent_unwell = _data.internals[0].recent_unwell ? _data.internals[0].recent_unwell : '无';
                            this.obj.other_record = _data.internals[0].other_record ? _data.internals[0].other_record : '无';
                            this.obj.other_unwell = _data.internals[0].other_unwell ? _data.internals[0].other_unwell : '无';
                            const internals = _data.internals[0];
                            //肝
                            if (internals.liver == 1) {
                                this.obj.liver_str = '正常';
                            } else {
                                this.obj.liver_str = internals.liver_str;
                            }
                            // if (_data.internals[0].liver_str != null) {
                            //     this.obj.liver_str = _data.internals[0].liver_str;
                            // }
                            //脾
                            if (internals.spleen == 1) {
                                this.obj.spleen_str = '正常';
                            } else {
                                this.obj.spleen_str = internals.spleen_str;
                            }
                            // if (_data.internals[0].spleen_str != null) {
                            //     this.obj.spleen_str = _data.internals[0].spleen_str;
                            // }
                            //心
                            if (internals.heart == 1) {
                                this.obj.heart_str = '正常';
                            } else {
                                this.obj.heart_str = internals.heart_str;
                            }
                            // if (_data.internals[0].heart_str != null) {
                            //     this.obj.heart_str = _data.internals[0].heart_str;
                            // }

                            if (internals.lung == 1) {
                                this.obj.lung_str = '正常';
                            } else {
                                this.obj.lung_str = internals.lung_str;
                            }
                            // if (_data.internals[0].lung_str != null) {
                            //     this.obj.lung_str = _data.internals[0].lung_str;
                            // }
                        }
                        //主检
                        if (_data.mainInspects && _data.mainInspects.length !== 0) {
                            const mainInspects = _data.mainInspects[0];
                            this.obj.health_assessment = mainInspects.health_assessment;
                            if (mainInspects.health_guide != null) {//健康指导
                                this.obj.health_guide = mainInspects.health_guide;
                            }

                            if (mainInspects.main_result != null) {//体检结论
                                this.obj.main_result = mainInspects.main_result.trim().replace(/<br>/g, `\n`);
                            }
                            this.obj.retest_name = mainInspects.retest_name;

                            if (mainInspects.health_assessment != null) {
                                if (this.obj.health_assessment === 1) {
                                    this.obj.health_assessment = '健康良好';
                                } else if (this.obj.health_assessment === 2) {
                                    this.obj.health_assessment = '患有疾病';
                                } else if (this.obj.health_assessment === 3) {
                                    this.obj.health_assessment = '身体残疾';
                                } else {
                                    this.obj.health_assessment = '无';
                                }
                            }
                        }
                        if (_data.inspects && _data.inspects.length > 0) {
                            this.obj.x_ray = _data.inspects[0].x_ray === 1 ? '未见异常' : (_data.inspects[0].x_ray === 2 ? '异常' : '');
                            if (_data.inspects[0].description) {
                                this.obj.x_ray = this.obj.x_ray + ' (' + _data.inspects[0].description + ' )';
                            }
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
                if (type === 1) {//皮肤
                    return this.skinCondition[argu] || '其他';
                } else if (type === 2) {//淋巴结
                    return this.lymphCondition[argu] || '其他';
                } else if (type === 3) {//胸部
                    return this.throaxCondition[argu] || '其他';
                } else if (type === 4) {//牙周
                    return this.periodontalCondition[argu] || '其他';
                } else if (type === 5) {//结核菌素
                    return this.tuberCondition[argu] || '其他';
                } else if (type === 6) {//屈光不正
                    return this.qgCondition[argu] || '其他';
                } else if (type === 7) {//临床印象
                    return this.lcyxCondition[argu] || '其他';
                } else if (type === 8) {//戴镜情况
                    return this.djCondition[argu] || '其他';
                } else if (type === 9) {//医生意见
                    return this.docCondition[argu] || '其他';
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
    .editTest {
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
                /*height: 700px !important;*/
                /*overflow-y: auto;*/
                /*overflow-x: hidden;*/
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

