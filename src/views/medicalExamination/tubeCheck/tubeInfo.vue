<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="644"
                class="tubeInfo"
                :mask-closable="false"
                @on-cancel="close"
                :footer-hide="true"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" inline label-position="top" style="padding-left: 74px;">
                <FormItem label="区域">
                    <i-input v-model.trim="obj.areaname" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="所属学校" style="margin-right: 0!important;">
                    <i-input v-model.trim="obj.dep_str" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="类别">
                    <i-input v-model.trim="obj.category_str" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="姓名" style="margin-right: 0!important;">
                    <i-input v-model.trim="obj.student_name" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="密切接触者史">
                    <i-input v-model.trim="obj.touch" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="可疑症状者" style="margin-right: 0!important;">
                    <i-input v-model.trim="obj.have" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="PPD试验结果判定">
                    <i-input v-model.trim="obj.ppdResult" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="X线检查结果" style="margin-right: 0!important;">
                    <i-input v-model.trim="obj.x_ray" style="width: 200px" disabled></i-input>
                </FormItem>

                <FormItem label="预防性服药">
                    <i-input style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="诊断结果"  style="margin-right: 0!important;">
                    <i-input  :maxlength="10" style="width: 200px" disabled></i-input>
                </FormItem>
                <!-- <FormItem label="预防性服药">
                    <i-input v-model.trim="obj.ppdResult" style="width: 200px" disabled></i-input>
                </FormItem>
                <FormItem label="诊断结果"  style="margin-right: 0!important;">
                    <i-input v-model.trim="result" :maxlength="10" style="width: 200px" disabled></i-input>
                </FormItem> -->
                <FormItem label="备注">
                    <i-input style="width: 200px" disabled></i-input>
                </FormItem>
            </Form>
            <div class="footer"></div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'tubeInfo',
        props: ['id', 'title', 'flag', 'infoData'],
        data() {
            return {
                obj: {
                    areaname: '',
                    dep_str: '',
                    category_str: '',
                    student_name: '',
                    touch: '',
                    have: '',
                    ppdResult: '',
                    x_ray:''
                },
                result: '',
                // 诊断结果
                docCondition: {
                    1: '是肺结核可疑症状者',
                    2: '是肺结核密切接触者',
                    3: '不是肺结核可疑症状者',
                    4: '不是肺结核密切接触者'
                }
            };
        },
        methods: {
            showData() {
                this.obj = this.id;
                // this.result = ''
                // if(this.obj.doctor_result) {
                //     let num1 = parseInt(this.obj.doctor_result / 10)
                //     let num2 = this.obj.doctor_result % 10
                //     let tmpStr = ''
                //     tmpStr = this.getDoctorResult(num1)+','
                //     tmpStr += this.getDoctorResult(num2)
                //     this.result = tmpStr
                // }
            },
             // 分析参数取值
            getDoctorResult(argu) {
                return this.docCondition[argu] || '其他'
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.showData()
        }
    };
</script>
<style lang="less">
    .tubeInfo {
        .ivu-form {
            padding-left: 66px;

            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .footer {
            padding: 0 38px 20px;

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

        .co-btn {

            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            border-radius: 4px;
            cursor: pointer;
        }

        .close {
            width: 70px;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
        }

        .confirm {
            width: 70px;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border: none;
        }
    }
</style>
