<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="500"
                class="fitModal label-right"
                :mask-closable="false"
                @on-cancel="close"
        >
            <Form ref="obj" :model="obj" :rules="rules" label-position="left" :label-width="84">
                <FormItem label="单位名称" prop="dep_name">
                    <i-input v-model.trim="obj.dep_name" :maxlength="30" style="width: 250px" placeholder="请输入"></i-input>
                    <!--<i-select v-model="obj.dep_name" style="width:250px" :disabled="!is_manage">-->
                        <!--<i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>-->
                    <!--</i-select>-->
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <i-input v-model.trim="obj.name" :maxlength="30" style="width: 250px" placeholder="请输入"></i-input>
                </FormItem>
                <!--<FormItem label="用户名" prop="user_name">-->
                    <!--<i-input v-model.trim="obj.user_name" :maxlength="30" style="width: 250px" placeholder="请输入"></i-input>-->
                <!--</FormItem>-->
                <FormItem label="性别" prop="gender">
                    <i-select v-model="obj.gender" style="width:250px">
                        <i-option :value='1'>男</i-option>
                        <i-option :value='2'>女</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="是否在职" prop="in_queue">
                    <i-select v-model="obj.in_queue" style="width:250px">
                        <i-option :value='1'>是</i-option>
                        <i-option :value='2'>否</i-option>
                    </i-select>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="co-btn close" @click='close'>取消</button>
                <button type="button" class="co-btn confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        name: 'AddFit',
        props: ['info', 'title', 'flag'],
        data() {
            return {
                obj: {
                    dep_name: '',
                    name: '',
                    // user_name: '',
                    gender: '',
                    in_queue: ''
                },
                rules: {
                    dep_name: [{required: true, message: '请输入单位名称', trigger: 'blur'}],
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    // user_name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    gender: [{required: true,type:'number', message: '请选择性别', trigger: 'change'}],
                    in_queue: [{required: true,type:'number', message: '请选择是否在职', trigger: 'change'}]
                },
                schoolList: [],
                is_manage: true
            };
        },
        methods: {
            search() {
                this.obj = Object.assign({}, this.info);
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if (this.info) { // 编辑
                        this.$ajax({
                            url: urls.MonStaff_edit,
                            data: {
                                id: this.info.id,
                                dep_name: this.obj.dep_name,
                                name: this.obj.name,
                                // user_name: this.obj.user_name,
                                gender: this.obj.gender,
                                in_queue: this.obj.in_queue
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改' + this.obj.name + '成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        this.$ajax({
                            url: urls.MonStaff_add,
                            data: {
                                dep_name: this.obj.dep_name,
                                name: this.obj.name,
                                // user_name: this.obj.user_name,
                                gender: this.obj.gender,
                                in_queue: this.obj.in_queue
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + this.obj.name + '成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
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
            if (this.info) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .fitModal {
        .ivu-form {
            padding-left: 66px;

            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        /*.ivu-modal-footer {*/
        /*border: none;*/
        /*padding: 0 38px 34px;*/
        /*}*/

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .co-btn{

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
