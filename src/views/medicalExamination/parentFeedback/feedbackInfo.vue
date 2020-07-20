<template>
    <div>
        <Modal
            :title="title1"
            :value="true"
            class="feedbackInfo"
            :mask-closable="false"
            @on-cancel="close"
            footer-hide
        >
            <div style="position: relative;margin-bottom:50px">
                <Form ref="obj" label-position="left">
                    <Row>
                        <i-col span="13">
                            <FormItem class="first-label" label="学校名称" :label-width="80">
                                <i-input v-model="obj.dep_id" style="width: 360px;" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="5">
                            <FormItem label="年级" class="right-label" :label-width="80" style="text-align: right;">
                                <i-input v-model="obj.grade_name" style="width: 95px" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="5">
                            <FormItem label="班级" class="right-label" :label-width="80">
                                <i-input v-model="obj.class_name" style="width: 95px;" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="4">
                            <FormItem label="姓名" class="right-label" :label-width="42">
                                <i-input v-model="obj.student_name" style="width: 100%;" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="4">
                            <FormItem label="性别" class="right-label" :label-width="60">
                                <i-input v-model="obj.gender" style="width: 80px;" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="4">
                            <FormItem label="年龄" class="right-label" :label-width="60">
                                <i-input v-model="obj.age" style="width: 80px;" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="证件号" class="right-label" :label-width="70">
                                <i-input v-model="obj.card_num" style="width: 100%;" :disabled="flag"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="23">
                            <FormItem label="既往病史" class="right-label" :label-width="72">
                                <Tooltip :content="obj.anamnesis" style="width: 100%;" v-if='obj.anamnesis!=null'>
                                    <i-input v-model="obj.anamnesis" style="width: 100%;" :disabled="flag"></i-input>
                                </Tooltip>
                                <i-input v-model="obj.anamnesis" style="width: 100%;" :disabled="flag" v-else></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row :gutter="40">
                        <i-col span="12" v-show="isShowCheck">
                            <h4 class="bodys"><span></span>健康体检反馈</h4>
                            <label class="bodys-child">家长反馈总意见</label>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.feedback" :row="5"
                                                 style="width: 360px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <div class="lines"></div>
                            <div v-for="exam in examList" :key="exam.one_exception_name">
                                <label class="bodys-child">{{exam.value}}</label>
                                <Row>
                                    <i-col span="24">
                                        <FormItem label="异常项" class="right-label" :label-width="80">
                                            <i-input v-model="obj.age" style="width: 280px;" :disabled="flag">
                                                {{exam.one_exception_name}}
                                            </i-input>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="24">
                                        <FormItem label="家长反馈" class="right-label" :label-width="80">
                                            <i-input v-model="obj.age" style="width: 280px;" :disabled="flag">
                                                {{exam.one_exception_advice}}
                                            </i-input>
                                        </FormItem>
                                    </i-col>
                                </Row>
                                <div class="lines"></div>
                            </div>
                        </i-col>
                        <i-col span="12" v-show="isShowWorkout">
                            <h4 class="bodys">体能测试反馈</h4>
                            <label class="bodys-child">家长反馈总意见</label>
                            <Row>
                                <i-col span="24">
                                    <FormItem label="" :label-width="0">
                                        <i-input v-model="obj.feedback" :row="5"
                                                 style="width: 360px;" :disabled="flag"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <div class="lines"></div>
                            <div v-for="workout in workoutList" :key="workout.one_exception_name">
                                <label class="bodys-child">{{workout.value}}</label>
                                <Row>
                                    <i-col span="24">
                                        <FormItem label="异常项" class="right-label" :label-width="80">
                                            <i-input v-model="obj.age" style="width: 280px;" :disabled="flag">
                                                {{workout.one_exception_name}}
                                            </i-input>
                                        </FormItem>
                                    </i-col>
                                    <i-col span="24">
                                        <FormItem label="家长反馈" class="right-label" :label-width="80">
                                            <i-input v-model="obj.age" style="width: 280px;" :disabled="flag">
                                                {{workout.one_exception_advice}}
                                            </i-input>
                                        </FormItem>
                                    </i-col>
                                </Row>
                                <div class="lines"></div>
                            </div>
                        </i-col>
                    </Row>
                    <div class="reportInfos">

                    </div>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '@/service/Urls';

    export default {
        name: 'feedbackInfo',
        props: ['modalTitle', 'flag', 'student_id', 'general_feedback'],
        data() {
            return {
                title1: '详情', //个人体检详细信息
                obj: {
                    dep_id: '',
                    grade_name: '',
                    class_name: '',
                    student_name: '',
                    feedback: '',
                    feedbackInfo: '',
                    gender: '',
                    age: '',
                    anamnesis: '',
                    card_num: '',
                    past_medical: '',
                    friend_have: '',
                    have_touch: '',
                    create_time: '',
                    other_symptoms: '',
                    main_symptoms: '',
                    phy_type: '', //判断升学体检和入学体检
                },
                gradeList: [],
                is_manage: true,
                isShowCheck: false,
                isShowWorkout: false,
                examList: [],
                workoutList: []
            }
        },
        methods: {
            getFeedback() {
                this.$ajax({ // 反馈
                    url: urls.examination_feedback_info,
                    data: {
                        student_id: this.student_id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj.feedbackInfo = data.data;
                        this.examList = data.data.anomalyDetectionData.filter(item => item.type === 1);
                        this.workoutList = data.data.anomalyDetectionData.filter(item => item.type === 2);
                        if (this.examList.length > 0) {
                            this.isShowCheck = true;
                        }
                        if (this.workoutList.length > 0) {
                            this.isShowWorkout = true;
                        }
                    } else {

                    }
                }).catch(err => {

                });
            },
            //复测个人信息详情
            getRetestInfo() {
                this.$ajax({
                    url: urls.retest_single_info,
                    data: {
                        student_id: this.student_id,
                        dataType: 'jsonp',
                        type: 2
                    }
                }).then(data => {
                    //debugger
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
                        this.obj.age = _data.age;
                        this.title1 = this.obj.phy_type == "2" ? '学生升学检查报告详情' : '学生健康体检报告详情'
                        // this.$emit('update:title', newtableData)

                        //既往病史
                        this.obj.anamnesis = _data.anamnesis ? _data.anamnesis : '无';
                        //基础信息
                        this.obj.create_time = _data.mainInspects.length !== 0 ? _data.mainInspects[0].create_time : '';
                        this.obj.gender = _data.gender === 1 ? '男' : '女';
                        this.obj.is_boarding = _data.is_boarding === 1 ? '是' : '否';
                        this.obj.past_medical = _data.past_medical === 1 ? '有' : '无';
                        this.obj.friend_have = _data.friend_have === 1 ? '有' : '无';
                        this.obj.have_touch = _data.have_touch === 1 ? '有' : '无';


                    } else {
                        this.obj = [];
                    }

                }).catch(err => {
                    this.obj = [];
                })

            },

            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.obj.feedback = this.general_feedback;
            this.getRetestInfo();
            this.getFeedback();
        }
    };
</script>
<style lang="less">
    .feedbackInfo {
        .ivu-modal {
            min-width: 900px;
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
                    font-family: SourceHanSansCN-Regular;
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
                font-size: 20px;
                margin-bottom: 12px;
                font-family: SourceHanSansCN-Medium;
                font-weight: 500;
                color: rgba(0, 0, 0, 1);
                margin-top: 28px;
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
            .bodys-child {
                font-size: 14px;
                font-weight: bold;
                color: rgba(126, 132, 133, 1);
            }
            .lines {
                width: 360px;
                height: 1px;
                margin: 15px 0 13px 0;
                border-bottom: 1px dashed rgba(221, 229, 231, 1);
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
                        font-family: SourceHanSansCN-Regular;
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
                    font-family: SourceHanSansCN-Regular;
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
