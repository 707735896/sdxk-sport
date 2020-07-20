<template>
    <div>
        <Modal
            :title="title1"
            :value="true"
            :width="1200"
            class="editTestes"
            :mask-closable="false"
            @on-cancel="close"
            footer-hide
        >
            <div style="position: relative;margin-bottom:50px">
                <Form ref="obj" label-position="left">
                    <Row>
                        <i-col span="6">
                            <FormItem class="first-label" label="学校名称" :label-width="80">
                                <i-input v-model="obj.school_name" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="7">
                            <FormItem label="年级-班级" class="right-label" :label-width="90" style="text-align: right;">
                                <i-input v-model="obj.gc" :disabled="flag"></i-input>
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
                        <!--<i-col span="3">-->
                        <!--<FormItem class="first-label" label="寄宿与否" :label-width="80">-->
                        <!--<i-input v-model="obj.is_boarding" style="width: 100%;" :disabled="flag"></i-input>-->
                        <!--</FormItem>-->
                        <!--</i-col>-->
                        <!--<i-col span="3">-->
                        <!--<FormItem class="right-label" label="民族" :label-width="50">-->
                        <!--<i-input v-model="obj.nation" style="width: 100%;" :disabled="flag"></i-input>-->
                        <!--</FormItem>-->
                        <!--</i-col>-->
                        <i-col span="24">
                            <FormItem label="既往病史*" class="right-label" :label-width="80">
                                <Tooltip :content="anamnesis" style="width: 100%;" v-if='anamnesis!=null'>
                                    <i-input v-model="anamnesis" :disabled="flag"></i-input>
                                </Tooltip>
                                <i-input v-model="anamnesis" :disabled="flag" v-else></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <!--<Row style="margin-bottom: 20px!important">-->
                    <!--<i-col span="6">-->
                    <!--<FormItem class="first-label" label="体检日期" :label-width="80">-->
                    <!--<i-input v-model="obj.create_time" style="width: 100%;" :disabled="flag"></i-input>-->
                    <!--</FormItem>-->
                    <!--</i-col>-->
                    <!--<i-col span="18" class="dotted">-->
                    <!--<FormItem label="残疾情况" class="right-label" :label-width="90">-->
                    <!--<Tooltip :content="obj.disability" style="width: 100%;" v-if='obj.anamnesis!=null'>-->
                    <!--<i-input v-model="obj.disability" style="width: 100%;" :disabled="flag"></i-input>-->
                    <!--</Tooltip>-->
                    <!--<i-input v-model="obj.disability" style="width: 100%;" :disabled="flag"-->
                    <!--v-else></i-input>-->
                    <!--</FormItem>-->
                    <!--</i-col>-->
                    <!--</Row>-->
                    <Row :gutter="40">
                        <i-col span="12">
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
                                    <FormItem label="有无龋齿" class="right-label" :label-width="80">
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
                                        <i-input v-model="obj.he_broken" style="width: 100px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_broken" style="width: 100px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="12">
                                    <FormItem label="龋失" class="" :label-width="60">
                                        <span slot="label">龋&emsp;失</span>
                                        <i-input v-model="obj.he_lose" style="width: 100px;" :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_lose" style="width: 100px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16" style="margin-bottom: 20px!important">
                                <i-col span="12">
                                    <FormItem label="龋补" :label-width="60">
                                        <span slot="label">龋&emsp;补</span>
                                        <i-input v-model="obj.he_repair" style="width: 100px;"
                                                 :disabled="flag"></i-input>
                                        <i-input v-model="obj.ru_repair" style="width: 100px;"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <!--<i-col span="12">-->
                                <!--<FormItem label="其他记录" class="dotted1" :label-width="60">-->
                                <!--<i-input v-model="obj.kqremark" style="width: 230px;"-->
                                <!--:disabled="flag"></i-input>-->
                                <!--</FormItem>-->
                                <!--</i-col>-->
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
                                        <i-input v-model="obj.heart_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="肺" class="first-label" :label-width="60">
                                        <span slot="label">肺&emsp;&emsp;</span>
                                        <i-input v-model="obj.lung_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="肝" class="first-label" :label-width="60">
                                        <span slot="label">肝&emsp;&emsp;</span>
                                        <i-input v-model="obj.liver_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="脾" class="first-label" :label-width="60">
                                        <span slot="label">脾&emsp;&emsp;</span>
                                        <i-input v-model="obj.spleen_str"
                                                 :disabled="flag"></i-input>
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
                        </i-col>
                        <i-col span="12">
                            <h4 class="bodys">外科</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem class="first-label" label="皮肤" :label-width="60">
                                        <i-input v-model="obj.skin_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem class="first-label" label="头部" :label-width="60">
                                        <i-input v-model="obj.head_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="颈部" class="first-label" :label-width="60">
                                        <i-input v-model="obj.neck_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="脊柱" class="first-label" :label-width="60">
                                        <i-input v-model="obj.spine_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="淋巴结" :label-width="60">
                                        <i-input v-model="obj.lymph_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem class="first-label" label="四肢" :label-width="60">
                                        <i-input v-model="obj.legs_str"
                                                 :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="24">
                                    <FormItem label="胸部" class="first-label" :label-width="60">
                                        <i-input v-model="obj.throax_str"
                                                 :disabled="flag"></i-input>
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

                            <h4 class="bodys">体检结果</h4>
                            <Row>
                                <i-col span="24">
                                    <FormItem :label-width="0" class="p-content">
                                        <p style="white-space: pre-line;">{{obj.rvalue}}</p>
                                    </FormItem>
                                </i-col>
                            </Row>

                            <h4 class="bodys">健康指导</h4>
                            <FormItem :label-width="0" class="p-content">
                                <p style="white-space: pre-line;">{{obj.pro_name}}</p>
                            </FormItem>
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
        name: 'physicalReportInfo',
        props: ['title', 'flag', 'student_id', 'row'],
        data() {
            return {
                title1: this.title,             //个人体检详细信息
                obj: {
                    dep_id: '',
                    grade_name: '',
                    class_name: '',
                    student_name: '',
                    gender: '',
                    card_num: '',
                    create_time: '',
                    phy_type: '',  //判断升学体检和入学体检
                    health_guide: ''
                },
                result: '',
                anamnesis: ''
            };
        },
        methods: {
            //复测个人信息详情
            getRetestInfo() {
                let obj = {...this.row};
                this.obj = obj;
                const {dentition, periodontal, decayed_tooth, he_broken, ru_broken, he_lose, ru_lose, he_repair, ru_repair} = obj;
                if (dentition && dentition == '2') {
                    this.obj.dentition = '不齐';
                } else {
                    this.obj.dentition = '整齐';
                }

                if (periodontal && periodontal == '2') {
                    this.obj.periodontal = '异常';
                } else {
                    this.obj.periodontal = '正常';
                }
                if (decayed_tooth && decayed_tooth == '2') {
                    this.obj.decayed_tooth = '有';
                } else {
                    this.obj.decayed_tooth = '无';
                }

                if (he_broken || he_broken === 0) {
                    this.obj.he_broken = '恒牙' + he_broken;
                }
                if (ru_broken || ru_broken === 0) {
                    this.obj.ru_broken = '乳牙' + ru_broken;
                }
                if (he_lose || he_lose === 0) {
                    this.obj.he_lose = '恒牙' + he_lose;
                }
                if (ru_lose || ru_lose === 0) {
                    this.obj.ru_lose = '乳牙' + ru_lose;
                }
                if (he_repair || he_repair === 0) {
                    this.obj.he_repair = '恒牙' + he_repair;
                }
                if (ru_repair || ru_repair === 0) {
                    this.obj.ru_repair = '乳牙' + ru_repair;
                }


                this.$ajax({
                    url: urls.parent_info,
                    data: {
                        student_id: this.student_id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        // this.result = data.data.result;
                        this.anamnesis = data.data.anamnesis ? data.data.anamnesis : '无';
                    }
                }).catch(err => {

                });
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
    .editTestes {
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

            .ivu-select-disabled .ivu-select-selection,
            .ivu-input[disabled],
            fieldset[disabled] .ivu-input {
                color: #515a6e;
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

