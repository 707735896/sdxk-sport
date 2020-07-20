import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/quenuList',
        meta: {
            title: '排队列表'
        },
        component: (resolve) => require(['./views/quenuList.vue'], resolve)
    },
    {
        path: '/quenu/:id/:code',
        name: 'quenu',
        meta: {
            title: '排队'
        },
        component: (resolve) => require(['./views/quenu.vue'], resolve)
    },
    {
        path: '/system',
        // name: 'system',
        meta: {
            title: '系统管理'
        },
        component: (resolve) => require(['./views/system/system.vue'], resolve),
        children: [
            {
                path: '/',
                name: 'system',
                meta: {
                    title: '系统管理首页'
                },
                component: (resolve) => require(['./views/system/systemIndex.vue'], resolve)
            },
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: (resolve) => require(['./views/system/user.vue'], resolve)
            },
            {
                path: 'role',
                name: 'role',
                meta: {
                    title: '角色管理'
                },
                component: (resolve) => require(['./views/system/role.vue'], resolve)
            },
            {
                path: 'functional',
                name: 'functional',
                meta: {
                    title: '功能管理'
                },
                component: (resolve) => require(['./views/system/functional.vue'], resolve)
            },
            {
                path: 'noticeManage',
                name: 'noticeManage',
                meta: {
                    title: '通知管理'
                },
                component: (resolve) => require(['./views/system/noticeManage.vue'], resolve)
            },

            {
                path: 'notice',
                name: 'notice',
                meta: {
                    title: '通知'
                },
                component: (resolve) => require(['./views/system/notice.vue'], resolve)
            },
            //小程序
            {
                path: 'applet',
                name: 'applet',
                meta: {
                    title: '小程序'
                },
                component: (resolve) => require(['./views/system/applet.vue'], resolve)
            },
            //健康咨询维护
            {
                path: 'healthResource',
                name: 'healthResource',
                meta: {
                    title: '健康资讯维护'
                },
                component: (resolve) => require(['./views/system/healthResource.vue'], resolve)
            },
            {
                path: 'dictionaryType',
                name: 'dictionaryType',
                meta: {
                    title: '字典表类别管理'
                },
                component: (resolve) => require(['./views/system/dictionaryType.vue'], resolve)
            },
            {
                path: 'dictionaryInfo',
                name: 'dictionaryInfo',
                meta: {
                    title: '字典信息管理'
                },
                component: (resolve) => require(['./views/system/dictionaryInfo.vue'], resolve)
            }
        ]
    },
    {
        path: '/medicalExamination',
        // name: 'medicalExamination',
        meta: {
            title: '健康体检'
        },
        component: (resolve) => require(['./views/medicalExamination/medicalExamination.vue'], resolve),
        children: [
            {
                path: '/',
                name: 'medicalExamination',
                meta: {
                    title: '体检项目首页'
                },
                component: (resolve) => require(['./views/medicalExamination/medicalIndex.vue'], resolve)
            },
            {
                path: 'prepare',
                name: 'prepare',
                meta: {
                    title: '体检准备'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                'children': [
                    {
                        path: 'examinationPlan',
                        name: 'examinationPlan',
                        meta: {
                            title: '体检项目规划'
                        },
                        component: (resolve) => require(['./views/medicalExamination/examinationPlan.vue'], resolve)
                    },
                    {
                        path: 'examinationTeamConfig',
                        name: 'examinationTeamConfig',
                        meta: {
                            title: '设定体检计划'
                        },
                        component: (resolve) => require(['./views/medicalExamination/manualPlan/setObject/setObjects.vue'], resolve)
                    },
                    // {
                    //     path: 'setObjects',
                    //     name: 'setObjects',
                    //     meta: {
                    //         title: '设定体检对象'
                    //     },
                    //     component: (resolve) => require(['./views/medicalExamination/manualPlan/setObject/setObjects.vue'], resolve)
                    // },
                    {
                        path: 'schedule',
                        name: 'schedule',
                        meta: {
                            title: '体检排程'
                        },
                        component: (resolve) => require(['./views/medicalExamination/manualPlan/schedule/schedule.vue'], resolve)
                    }
                ]
            },
            {
                path: 'examinationAction',
                name: 'examinationAction',
                meta: {
                    title: '体检执行'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                'children': [
                    {
                        path: 'tubAndComList',
                        name: 'tubAndComList',
                        meta: {
                            title: '既往结核病史和接触史名单'
                        },
                        component: (resolve) => require(['./views/medicalExamination/tubAndCom/tubAndComList.vue'], resolve),
                    },
                    {
                        path: 'condition',
                        name: 'condition',
                        meta: {
                            title: '体检情况显示'
                        },
                        component: (resolve) => require(['./views/medicalExamination/Condition.vue'], resolve),
                    }
                ]
            },
            {
                path: 'medicalReport',
                name: 'medicalReport',
                meta: {
                    title: '体检报告'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                'children': [
                    {
                        path: 'schoolImport',
                        name: 'schoolImport',
                        meta: {
                            title: '县市学校体检数据批量导入'
                        },
                        component: (resolve) => require(['./views/medicalExamination/medicalReport/schoolImport'], resolve)
                    },
                    {
                        path: 'examImport',
                        name: 'examImport',
                        meta: {
                            title: '体检数据批量导出'
                        },
                        component: (resolve) => require(['./views/medicalExamination/medicalReport/examImport.vue'], resolve)
                    },
                    {
                        path: 'examResult',
                        name: 'examResult',
                        meta: {
                            title: '小程序结果通知'
                        },
                        component: (resolve) => require(['./views/medicalExamination/medicalReport/examResult.vue'], resolve)
                    },
                    {
                        path: 'personSummaryReport',
                        name: 'personSummaryReport',
                        meta: {
                            title: '电子体检报告'
                        },
                        component: (resolve) => require(['./views/medicalExamination/medicalReport/personSummaryReport.vue'], resolve)
                    },
                    {
                        path: 'notifyParents',
                        name: 'notifyParents',
                        meta: {
                            title: '告家长书'
                        },
                        component: (resolve) => require(['./views/medicalExamination/medicalReport/notifyParents.vue'], resolve)
                    }
                ]
            },
            {
                path: 'reTests',
                name: 'reTests',
                meta: {
                    title: '体检复查反馈'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'reTest',
                        name: 'reTest',
                        meta: {
                            title: '校医核实'
                        },
                        component: (resolve) => require(['./views/medicalExamination/reset/reTest.vue'], resolve)
                    },
                    {
                        path: 'parentFeedback',
                        name: 'parentFeedback',
                        meta: {
                            title: '家长反馈'
                        },
                        component: (resolve) => require(['./views/medicalExamination/parentFeedback/parentFeedback.vue'], resolve)
                    },
                    {
                        path: 'followed',
                        name: 'followed',
                        meta: {
                            title: '校医追踪复测'
                        },
                        component: (resolve) => require(['./views/medicalExamination/follow/Follow.vue'], resolve)
                    }
                ]
            },
            {
                path: 'statistics',
                name: 'statistics',
                meta: {
                    title: '统计汇总'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'summaryReport',
                        name: 'summaryReport',
                        meta: {
                            title: '体检报告单汇总'
                        },
                        component: (resolve) => require(['./views/medicalExamination/medicalReport/summaryReport.vue'], resolve)
                    },
                    {
                        path: 'tubeCheck',
                        name: 'tubeCheck',
                        meta: {
                            title: '新生入学结核病检查汇总表'
                        },
                        component: (resolve) => require(['./views/medicalExamination/tubeCheck/tubeCheck.vue'], resolve)
                    }
                ]
            },
            {
                path: 'dataReport',
                name: 'dataReport',
                meta: {
                    title: '数据上报'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'templetSet',
                        name: 'templetSet',
                        meta: {
                            title: '上报体检数据模板设定'
                        },
                        component: (resolve) => require(['./views/medicalExamination/dataReport/templetSet.vue'], resolve)
                    },
                ]
            }
        ]
    },
    {
        path: '/dataCenter',
        // name: 'dataCenter',
        meta: {
            title: '数据中心'
        },
        component: (resolve) => require(['./views/dataCenter/dataContent.vue'], resolve),
        children: [
            {
                path: '/',
                name: 'dataCenter',
                meta: {
                    title: '基础数据首页'
                },
                component: (resolve) => require(['@/views/dataCenter/dataIndex'], resolve)
            },
            {
                path: 'basicFoundation',
                name: 'basicFoundation',
                meta: {
                    title: '基础构建服务'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                'children': [
                    {
                        path: 'systemDialog',
                        name: 'systemDialog',
                        meta: {
                            title: '系统日志'
                        },
                        component: (resolve) => require(['./views/dataCenter/systemDialog/systemDialog.vue'], resolve)
                    }
                    // ,{
                    //     path: 'standardizedImport',
                    //     name: 'standardizedImport',
                    //     meta: {
                    //         title: '数据标准化导入'
                    //     },
                    //     component: (resolve) => require(['./views/dataCenter/standardizedImport/standardizedImport.vue'], resolve)
                    // },
                    // {
                    //     path: 'standardizedOut',
                    //     name: 'standardizedOut',
                    //     meta: {
                    //         title: '数据标准化导入'
                    //     },
                    //     component: (resolve) => require(['./views/dataCenter/standardizedOut/standardizedOut.vue'], resolve)
                    // }
                ]
            },
            {
                path: 'basicData',
                name: 'basicData',
                meta: {
                    title: '基础数据信息'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                'children':[
                    {
                        path: 'education',
                        name: 'education',
                        meta: {
                            title: '教育体系信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/education/Education.vue'], resolve)
                    },
                    {
                        path: 'diseaseControl',
                        name: 'diseaseControl',
                        meta: {
                            title: '疾控中心信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/diseaseControl/diseaseControl.vue'], resolve)
                    },
                    {
                        path: 'fitMonitor',
                        name: 'fitMonitor',
                        meta: {
                            title: '体质监测基础信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/fitMonitor/fitMonitor.vue'], resolve)
                    },
                    {
                        path: 'unit',
                        name: 'unit',
                        meta: {
                            title: '医疗机构信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/unit/unitList.vue'], resolve)
                    },
                    {
                        path: 'schDocInfo',
                        name: 'schDocInfo',
                        meta: {
                            title: '校医信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/schDocInfo/schDocList.vue'], resolve)
                    },
                    {
                        path: 'schoolInfo',
                        name: 'schoolInfo',
                        meta: {
                            title: '学校信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/schoolInfo/schoolList.vue'], resolve)
                    },
                    {
                        path: 'teacherInfo',
                        name: 'teacherInfo',
                        meta: {
                            title: '老师信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/teacherInfo/teacherList.vue'], resolve)
                    },
                    {
                        path: 'classInfo',
                        name: 'classInfo',
                        meta: {
                            title: '班级信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/classInfo/classList.vue'], resolve)
                    },
                    // {
                    //     path: 'sectionInfo',
                    //     name: 'sectionInfo',
                    //     meta: {
                    //         title: '科室信息管理'
                    //     },
                    //     component: (resolve) => require(['./views/dataCenter/sectionInfo/sectionList.vue'], resolve)
                    // },
                    {
                        path: 'doctorInfo',
                        name: 'doctorInfo',
                        meta: {
                            title: '医生信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/doctorInfo/doctorList.vue'], resolve)
                    },
                    {
                        path: 'studentInfo',
                        name: 'studentInfo',
                        meta: {
                            title: '学生信息管理'
                        },
                        component: (resolve) => require(['./views/dataCenter/studentInfo/studentList.vue'], resolve)
                    }
                ]
            },
            {
                path: 'DataConfig',
                name: 'DataConfig',
                meta: {
                    title: '基础配置'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                'children': [
                    {
                        path: 'examinationItemConf',
                        name: 'examinationItemConf',
                        meta: {
                            title: '体检项目参数配置'
                        },
                        component: (resolve) => require(['./views/medicalExamination/examConfig/examinationItemConf.vue'], resolve)
                    },
                    {
                        path: 'physicalParaConfig',
                        name: 'physicalParaConfig',
                        meta: {
                            title: '体测项目参数配置'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalParaConfig/physicalParaConfig.vue'], resolve)
                    },
                    {
                        path: 'proofreading',
                        name: 'proofreading',
                        meta: {
                            title: '学生检测名单'
                        },
                        component: (resolve) => require(['./views/medicalExamination/manualPlan/checkStudentlist/medicalHistory.vue'], resolve)
                    },
                    {
                        path: 'tempList',
                        name: 'tempList',
                        meta: {
                            title: '临时名单入口'
                        },
                        component: (resolve) => require(['./views/dataCenter/tempStudent/TempStudent.vue'], resolve)
                    },
                    {
                        path: 'printQRcode',
                        name: 'printQRcode',
                        meta: {
                            title: '体检二维码生成'
                        },
                        component: (resolve) => require(['./views/medicalExamination/manualPlan/qrcode/QRcode.vue'], resolve)
                    },
                    {
                        path: 'review',
                        name: 'review',
                        meta: {
                            title: '学校班级人数审核'
                        },
                        component: (resolve) => require(['./views/medicalExamination/manualPlan/planReview.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/monitor',
        // name: 'monitor',
        meta: {
            title: '体质监测'
        },
        component: (resolve) => require(['./views/monitor/monitor.vue'], resolve),
        children: [
            {
                path: '/',
                name: 'monitor',
                meta: {
                    title: '体质监测首页'
                },
                component: (resolve) => require(['./views/monitor/monitorIndex.vue'], resolve)
            },
            {
                path: 'monitorPrepare',
                name: 'monitorPrepare',
                meta: {
                    title: '监测准备'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'monitorStudentsList',
                        name: 'monitorStudentsList',
                        meta: {
                            title: '体质监测名单'
                        },
                        component: (resolve) => require(['./views/monitor/monitorPrepare/studentsCheck/monitorHistory.vue'], resolve)
                    },
                    {
                        path: 'monitorProjectPlan',
                        name: 'monitorProjectPlan',
                        meta: {
                            title: '监测项目规划'
                        },
                        component: (resolve) => require(['./views/monitor/monitorPrepare/monitorProjectPlan.vue'], resolve)
                    },
                    {
                        path: 'monitorTeamConfig',
                        name: 'monitorTeamConfig',
                        meta: {
                            title: '监测队伍配置'
                        },
                        component: (resolve) => require(['./views/monitor/monitorPrepare/monitorTeamConfig.vue'], resolve)
                    },
                    {
                        path: 'monitorPlan',
                        name: 'monitorPlan',
                        meta: {
                            title: '监测计划规划（手动）'
                        },
                        component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                        children: [
                            {
                                path: 'setMonitorObj',
                                name: 'setMonitorObj',
                                meta: {
                                    title: '设定监测计划'
                                },
                                component: (resolve) => require(['./views/monitor/monitorPrepare/monitorTestPlan/monitorTestPlan.vue'], resolve)
                            },
                            {
                                path: 'monitorTime',
                                name: 'monitorTime',
                                meta: {
                                    title: '监测排程'
                                },
                                component: (resolve) => require(['./views/monitor/monitorPrepare/monitortestSchedule/monitortestSchedule.vue'], resolve)
                            }
                            // ,{
                            //     path: 'auditing',
                            //     name: 'auditing',
                            //     meta: {
                            //         title: '审核'
                            //     },
                            //     component: (resolve) => require(['./views/monitor/monitorPrepare/monitorTestAudit/monitorTestAudit.vue'], resolve)
                            // }
                        ]
                    },
                    {
                        path: 'physicalExamination',
                        name: 'physicalExamination',
                        meta: {
                            title: '体质抽查'
                        },
                        component: (resolve) => require(['./views/monitor/monitorPrepare/physicalexamination/physicalExamination.vue'], resolve)
                    }
                    // ,{
                    //     path: '/monitorPlanAuto',
                    //     name: 'monitorPlanAuto',
                    //     meta: {
                    //         title: '监测计划规划（自动）'
                    //     },
                    //     component: (resolve) => require(['./views/monitor/monitorPrepare/monitorPrepare.vue'], resolve),
                    //     children: [
                    //
                    //     ]
                    // },
                ]
            },
            {
                path: 'monitorReport',
                name: 'monitorReport',
                meta: {
                    title: '体质监测报告'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'cityDataReport',
                        name: 'cityDataReport',
                        meta: {
                            title: '县市学校体质监测数据批量导入'
                        },
                        component: (resolve) => require(['./views/monitor/monitorReport/cityDataReport.vue'], resolve)
                    },
                    {
                        path: 'monitorDataExport',
                        name: 'monitorDataExport',
                        meta: {
                            title: '体质监测数据批量导出'
                        },
                        component: (resolve) => require(['./views/monitor/monitorReport/monitorDataExport.vue'], resolve)
                    },
                    {
                        path: 'monitorResult',
                        name: 'monitorResult',
                        meta: {
                            title: '小程序结果通知'
                        },
                        component: (resolve) => require(['./views/monitor/monitorReport/monitorResult.vue'], resolve)
                    },
                    {
                        path: 'monitorElectronic',
                        name: 'monitorElectronic',
                        meta: {
                            title: '体质监测电子报告'
                        },
                        component: (resolve) => require(['./views/monitor/monitorReport/monitorElectronic.vue'], resolve)
                    }
                ]
            },

            {
                path: 'statisSummary',
                name: 'statisSummary',
                meta: {
                    title: '统计汇总'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children:[
                    {
                        path: 'monitorStatisSummary',
                        name: 'monitorStatisSummary',
                        meta: {
                            title: '体质监测报告单汇总'
                        },
                        component: (resolve) => require(['./views/monitor/statisSummary/monitorStatisSummary.vue'], resolve)
                    }
                ]
            },

            {
                path: 'dataUpload',
                name: 'dataUpload',
                meta: {
                    title: '数据上报'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children:[
                    {
                        path: 'monitorDataUpload',
                        name: 'monitorDataUpload',
                        meta: {
                            title: '体质监测数据上报'
                        },
                        component: (resolve) => require(['./views/monitor/monitorDataUpload/monitorDataUpload.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/physicalFitnessTest',
        // name: 'physicalFitnessTest',
        meta: {
            title: '健康体测'
        },
        component: (resolve) => require(['./views/physicalFitnessTest/physicalFitnessTest.vue'], resolve),
        children: [
            {
                path: '/',
                name: 'physicalFitnessTest',
                meta: {
                    title: '首页'
                },
                component: (resolve) => require(['./views/physicalFitnessTest/physicalFitnessIndex.vue'], resolve)
            },
            {
                path: 'physicalPrepare',
                name: 'physicalPrepare',
                meta: {
                    title: '体测准备'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'projectPlanNew',
                        name: 'projectPlanNew',
                        meta: {
                            title: '体测项目规划'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/projectPlan.vue'], resolve)
                    }
                    // ,{
                    //     path: '/physicalTestPlan',
                    //     name: 'physicalTestPlan',
                    //     meta: {
                    //         title: '体测计划规划（手动）'
                    //     },
                    //     component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalPrepare.vue'], resolve),
                    //     children: [
                    //         {
                    //             path: 'physicaltestobject',
                    //             name: 'physicaltestobject',
                    //             meta: {
                    //                 title: '设定体测对象'
                    //             },
                    //             component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalTestPlan/physicalTestPlan.vue'], resolve)
                    //         },
                    //         {
                    //             path: 'physicalschedule',
                    //             name: 'physicalschedule',
                    //             meta: {
                    //                 title: '体测排程'
                    //             },
                    //             component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicaltestSchedule/physicaltestSchedule.vue'], resolve)
                    //         },
                    //         {
                    //             path: 'physicalaudit',
                    //             name: 'physicalaudit',
                    //             meta: {
                    //                 title: '审核'
                    //             },
                    //             component: (resolve) => require(['./views/physicalFitnessTest/physicalPrepare/physicalTestAudit/physicalTestAudit.vue'], resolve)
                    //         }
                    //     ]
                    // }
                ]
            },
            {
                path: 'physicalAction',
                'name': 'physicalAction',
                meta: {
                    title: '体测执行'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                'children': [
                    {
                        path: 'physicalDataEntry',
                        'name': 'physicalDataEntry',
                        meta: {
                            title: '体能测试数据录入'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/dataEntry/dataEntry.vue'], resolve),
                    }
                ]
            },
            {
                path: 'physicalReport',
                name: 'physicalReport',
                meta: {
                    title: '体测报告'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'noTestStudent',
                        name: 'noTestStudent',
                        meta: {
                            title: '未测学生名单'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/noTest/noTestStudent.vue'], resolve),
                    },
                    {
                        path: 'physicalData',
                        name: 'physicalData',
                        meta: {
                            title: '县市学校体测数据批量导入'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/physicalData.vue'], resolve)
                    },
                    {
                        path: 'resultInform',
                        name: 'resultInform',
                        meta: {
                            title: '小程序结果通知'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/resultInform.vue'], resolve)
                    },
                    {
                        path: 'resultSummarizing',
                        name: 'resultSummarizing',
                        meta: {
                            title: '体能测试数据批量导出'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/resultSummarizing.vue'], resolve)
                    },
                    {
                        path: 'elecPhysicalReport',
                        name: 'elecPhysicalReport',
                        meta: {
                            title: '体能测试电子报告'
                        },
                        component: (resolve) => require(['./views/physicalFitnessTest/physicalReport/elecPhysicalReport.vue'], resolve)
                    }
                ]
            },
            {
                path: 'testReport',
                name: 'testReport',
                meta: {
                    title: '统计汇总'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'fitData',
                        name: 'fitData',
                        meta: {
                            title: '体能测试报告单汇总'
                        },
                        component: resolve => require(['./views/physicalFitnessTest/physicalReport/fitData.vue'], resolve)
                    }
                ]
            },
            {
                path: 'fitDataReport',
                name: 'fitDataReport',
                meta: {
                    title: '数据上报'
                },
                component: (resolve) => require(['./components/MiddlePage.vue'], resolve),
                children: [
                    {
                        path: 'fitDataTempale',
                        name: 'fitDataTempale',
                        meta: {
                            title: '体能测试报告单汇总'
                        },
                        component: resolve => require(['./views/physicalFitnessTest/physicalReport/fitData.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        redirect: '/index'
    }
];

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes
};
const router = new Router(RouterConfig);
export default router;
