<template>
    <div id="sectionAdd">
        <Modal
                :title="title"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="sectionModal"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="left">
                <FormItem label="科室名称" prop="name" style="margin-left: 66px">
                    <i-input v-model.trim="obj.name" :maxlength="15" style="width: 160px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="所属医疗机构" prop="dep_id">
                    <i-select v-model="obj.dep_id" filterable style="width:200px" :disabled="!is_manage">
                        <i-option v-for="item of hospitalList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from 'src/service/Urls';

    export default {
        name: 'AddSection',
        props: ['id', 'title'],
        data() {
            return {
                obj: {
                    name: '',
                    dep_id: '',
                },
                rules: {
                    name: [{required: true, message: '请输入科室名称', trigger: 'blur'}],
                    dep_id: [{required: true, message: '请选择所属医疗机构', trigger: 'change'}]
                },
                hospitalList: [],
                is_manage: true
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    url: urls.dept_all_list,
                    data: {
                        type: 3,
                        status: 1,
                        dep_id:sessionStorage.getItem('dep_id')
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.hospitalList = data.data.filter((item)=>item.type ===3);
                    } else {
                        this.hospitalList = [];
                    }
                }).catch(err => {
                    this.hospitalList = [];
                });
            },
            search() {
                this.$ajax({
                    url: urls.section_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            name: data.data.name,
                            dep_id: data.data.dep_id,
                        };
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data;
                    if (this.id) { // 编辑
                        data = {
                            id: this.id,
                            name: this.obj.name,
                            dep_id: this.obj.dep_id,
                        };
                        this.$ajax({
                            url: urls.section_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑' + data.name + '科室成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        data = {
                            name: this.obj.name,
                            dep_id: this.obj.dep_id,
                        };
                        this.$ajax({
                            url: urls.section_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '科室成功');
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

            this.getSelectCondition();
            if (this.id) { //编辑
                if(sessionStorage.getItem('roleCode') !== '999'){
                    this.is_manage = false;
                    // this.obj.dep_id = sessionStorage.getItem('dep_id');
                }
                this.search();
            }else {
                if(sessionStorage.getItem('roleCode') !== '999'){
                    this.is_manage = false;
                    this.obj.dep_id = sessionStorage.getItem('dep_id');
                }
            }
        }
    };
</script>
<style lang="less">

    .sectionModal {
        /*.ivu-modal-footer {*/
            /*border: none;*/
            /*padding: 0 38px 34px;*/
        /*}*/
        .ivu-modal-body {
            height: 300px;
            padding-top: 35px;
            .ivu-form-item-label {
                color: #333 !important;
            }
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
    }
</style>
