import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import ReactQuill from "react-quill";
import { Accordion } from "@radix-ui/react-accordion";
import {
  Briefcase,
  Building,
  ClipboardList,
  FileText,
  Link,
  Upload,
} from "lucide-react";
import "react-quill/dist/quill.snow.css";
import { JobCategories, Status } from "../enums/Status";
import {
  FormButtonControl,
  ImageInputControl,
  TextAreaControl,
  TextInputControl,
  ValueSelecterControl,
} from "../shared/components/controls/FormControls";
import { socialLinks } from "../enums/AppLinks";
import TagComponent from "../shared/components/ui/Tags/TagComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostAction,
  getSimilarJobsAction,
  getSingleJobAction,
  updatePostAction,
} from "../store/actions/JobHuntingActions ";
import { useParams, useSearchParams } from "react-router-dom";
import { RichContentControl } from "../shared/components/controls/RichContentControl";
import AlertPopUp from "../utils/AlertPopUp";

const steps = [
  "Basic Info",
  "Organization Info",
  "Job Details",
  "Links",
  "Photos & Remarks",
];

const initialValues = {
  postTitle: "",
  categoryId: 1,
  short_Description: "",
  organizationName: "",
  organizationWebsite: "",
  aboutOrganization: "",
  jobRole: "",
  qualification: "",
  experience: "",
  batch: "",
  salary: "",
  jobLocation: "",
  lastApplyDate: "",
  job_Description: "",
  appyInstructions:
    "All interested and eligible candidates can apply for the Recruitment of above mentioned position online by the following link as soon as possible. Read all the details given on this page Scroll down to read more details & apply the link Click on the apply link to be redirected to the company career site Read all responsibilities & requirements Then fill out the application & submit it",
  appyLink: "",
  whatsAppGroupLink: `${socialLinks[1].url},${socialLinks[5].url}`,
  telegramGroupLink: socialLinks[2].url,
  instagramLink: socialLinks[4].url,
  linkedInLink: socialLinks[3].url,
  requirements: "",
  long_Description: "",
  coverPhoto: "",
  cardPhoto: "",
  remarks: "",
  tagsString: "",
  statusId: Status.Draft,
  isFeatured: false,
};

const Stepper = ({ steps, currentStep }) => (
  <div className="flex justify-between mb-8">
    {steps.map((label, index) => (
      <div
        key={index}
        className={`text-sm text-center flex-1 ${
          index <= currentStep ? "text-white font-bold" : "text-white/40"
        }`}
      >
        <div
          className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
            index <= currentStep ? "bg-teal-500" : "bg-gray-500"
          }`}
        >
          {index + 1}
        </div>
        {label}
      </div>
    ))}
  </div>
);

const PostJobWizard = () => {
  const validationStep1Schema = Yup.object({
    postTitle: Yup.string("").required("Title Required"),
    categoryId: Yup.number().required("Category Required"),
    short_Description: Yup.string().required("Short Description Required"),
  });
  const validationStep2Schema = Yup.object({
    organizationName: Yup.string().required("Organization Name Required"),
    organizationWebsite: Yup.string().required("Organization Website Required"),
    aboutOrganization: Yup.string().required("About Organization Required"),
  });
  const validationStep3Schema = Yup.object({
    jobRole: Yup.string().required("Job Role Required"),
    qualification: Yup.string().required("Qualification Required"),
    experience: Yup.string().required("Experience Required"),
    batch: Yup.string().required("Batch Required"),
    salary: Yup.string().required("Salary Required"),
    jobLocation: Yup.string().required("Job Location Required"),
    lastApplyDate: Yup.string(),
    tagsString: Yup.string(),
  });
  const validationStep4Schema = Yup.object({
    applyInstructions: Yup.string(),
    appyLink: Yup.string().required("Apply Link Required"),
  });
  const validationStep5Schema = Yup.object({
    long_Description: Yup.string().required("Long Description Required"),
    statusId: Yup.number(Status.Draft).required("Status Required"),

    remarks: Yup.string().required("Remarks Required"),
    coverPhoto: Yup.string(),
    cardPhoto: Yup.string(),
    isFeatured: Yup.boolean(),
  });
  const [step, setStep] = useState(0);
  const [coverPhotoRef, setCoverPhotoRef] = useState(null);
  const [cardPhotoRef, setCardPhotoRef] = useState(null);
  const job = useSelector((state) => state.jobhunting.job);
  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (editId) {
      dispatch(getSingleJobAction({ uniqueId: editId }));
      dispatch(getSimilarJobsAction({ name: job?.organizationName }));
    }
  }, [dispatch, editId]);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Final values", values);
    if (editId) {
      dispatch(updatePostAction(values, setSubmitting));
    } else {
      dispatch(addPostAction({ ...values, id: job?.id }, setSubmitting));
    }
  };

  const renderStep = (formik) => {
    const { values, setFieldValue, handleChange, errors, handleBlur, touched } =
      formik;
    switch (step) {
      case 0:
        return (
          <>
            <TextInputControl
              id="postTitle"
              name="postTitle"
              label="Post Title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.postTitle}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
            />
            <ValueSelecterControl
              // className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              optionsClassName="text-gray-400"
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              label="Job Type"
              name="categoryId"
              id="categoryId"
              value={values.categoryId}
              onChange={(e) =>
                setFieldValue("categoryId", parseInt(e.target.value))
              }
              options={Object.entries(JobCategories).map(([key, value]) => ({
                value: value,
                label: key,
              }))}
            />
            <TextAreaControl
              id="short_Description"
              name="short_Description"
              label="Summary"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.short_Description}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
            />
          </>
        );
      case 1:
        return (
          <>
            <TextInputControl
              id="organizationName"
              name="organizationName"
              label="Organization Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.organizationName}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
            />
            <TextInputControl
              id="organizationWebsite"
              name="organizationWebsite"
              label="Organization Website"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.organizationWebsite}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
            />

            <RichContentControl
              label="About Organization"
              name="aboutOrganization"
              value={values.aboutOrganization}
              setFieldValue={setFieldValue}
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInputControl
                id="jobRole"
                name="jobRole"
                label="Job Role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobRole}
                errors={errors}
                labelClassName="block mb-1 text-sm font-medium text-white"
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              />{" "}
              <TextInputControl
                id="qualification"
                name="qualification"
                label="Qualification"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.qualification}
                errors={errors}
                labelClassName="block mb-1 text-sm font-medium text-white"
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              />{" "}
              <TextInputControl
                id="experience"
                name="experience"
                label="Experience"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.experience}
                errors={errors}
                labelClassName="block mb-1 text-sm font-medium text-white"
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              />{" "}
              <TextInputControl
                id="batch"
                name="batch"
                label="Batch"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.batch}
                errors={errors}
                labelClassName="block mb-1 text-sm font-medium text-white"
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              />{" "}
              <TextInputControl
                id="salary"
                name="salary"
                label="Salary"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.salary}
                errors={errors}
                labelClassName="block mb-1 text-sm font-medium text-white"
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              />
              <TextInputControl
                id="jobLocation"
                name="jobLocation"
                label="Job Location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobLocation}
                errors={errors}
                labelClassName="block mb-1 text-sm font-medium text-white"
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              />
              <TextInputControl
                type="date"
                id="lastApplyDate"
                name="lastApplyDate"
                label="Last Apply Date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastApplyDate}
                errors={errors}
                labelClassName="block mb-1 text-sm font-medium text-white"
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              />
              <TagComponent
                id="tagsString"
                label="Tags"
                name="tagsString"
                options={[]}
                inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
                labelClassName="block mb-1 text-sm font-medium text-white"
                handleChange={setFieldValue}
                value={values?.tagsString}
                errors={errors}
              />
            </div>
            <RichContentControl
              label="Job Description"
              name="job_Description"
              value={values.job_Description}
              setFieldValue={setFieldValue}
            />
            <RichContentControl
              label="Requirements or Benefits"
              name="requirements"
              value={values.requirements}
              setFieldValue={setFieldValue}
            />
          </>
        );
      case 3:
        return (
          <>
            <RichContentControl
              label="Apply Instructions"
              name="appyInstructions"
              value={values.appyInstructions}
              setFieldValue={setFieldValue}
            />
            <TextInputControl
              id="appyLink"
              name="appyLink"
              label="Apply Link"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.appyLink}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
            />
          </>
        );
      case 4:
        return (
          <>
            <RichContentControl
              label="Long Description"
              name="long_Description"
              value={values.long_Description}
              setFieldValue={setFieldValue}
            />
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cover Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                    {values.coverPhoto ? (
                      <img
                        src={values.coverPhoto}
                        alt="Cover"
                        className="max-h-32 mx-auto mb-2"
                      />
                    ) : (
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    )}
                    <button
                      type="button"
                      onClick={() => coverPhotoRef?.click()}
                      className="text-teal-300 hover:text-teal-100"
                    >
                      Choose Cover Photo
                    </button>
                    <ImageInputControl
                      errors={errors}
                      name="coverPhoto"
                      setFieldValue={setFieldValue}
                      handleBlur={handleBlur}
                      refprop={(ref) => setCoverPhotoRef(ref)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Card Photo
                  </label>
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                    {values.cardPhoto ? (
                      <img
                        src={values.cardPhoto}
                        alt="Card"
                        className="max-h-32 mx-auto mb-2"
                      />
                    ) : (
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    )}
                    <button
                      type="button"
                      onClick={() => cardPhotoRef?.click()}
                      className="text-teal-300 hover:text-teal-100"
                    >
                      Choose Card Photo
                    </button>
                    <ImageInputControl
                      name="cardPhoto"
                      errors={errors}
                      setFieldValue={setFieldValue}
                      handleBlur={handleBlur}
                      refprop={(ref) => setCardPhotoRef(ref)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <TextAreaControl
              id="remarks"
              name="remarks"
              label="Remarks"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.remarks}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
            />
            <ValueSelecterControl
              // className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              inputClassName="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
              optionsClassName="text-gray-400"
              setFieldValue={setFieldValue}
              handleChange={handleChange}
              errors={errors}
              labelClassName="block mb-1 text-sm font-medium text-white"
              label="Job Type"
              name="statusId"
              id="statusId"
              value={values.statusId}
              onChange={(e) =>
                setFieldValue("statusId", parseInt(e.target.value))
              }
              options={[
                {
                  label: "Draft",
                  value: Status.Draft,
                },
                {
                  label: "Published",
                  value: Status.Published,
                },
              ]}
            />
            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="isFeatured" id="isFeatured" />
              <label htmlFor="isFeatured">Mark as Featured</label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const validationOnStep = (stepNo) => {
    switch (stepNo) {
      case 0:
        return validationStep1Schema;
        break;
      case 1:
        return validationStep2Schema;
        break;
      case 2:
        return validationStep3Schema;
        break;
      case 3:
        return validationStep4Schema;
        break;
      case 4:
        return validationStep5Schema;
        break;
      default:
        return Yup.object({});
    }
  };
  const validateCurrentStep = async (step, schema, actions) => {
    const errors = await actions.validateForm();

    actions.setTouched(
      Object.keys(schema.fields).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="min-h-screen  text-white px-4 py-0">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Create a post</h1>
        <Stepper steps={steps} currentStep={step} />
        <Formik
          initialValues={{ ...initialValues, ...job }}
          validationSchema={validationOnStep(step)}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            const schema = validationOnStep(step);
            if (step === steps.length - 1) {
              const { setSubmitting } = actions;
              if(job && job.statusId === Status.Published){
                AlertPopUp(0, "Job already published. You can only edit it as draft", "", "Bookmard add");
                return;
              }
              handleSubmit(values, { setSubmitting });
            } else {
              const isValid = await validateCurrentStep(step, schema, actions);
              if (isValid) handleNext();
            }
          }}
        >
          {({ isSubmitting, ...formik }) => (
            <Form>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep(formik)}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                  >
                    Back
                  </button>
                )}
                <FormButtonControl
                  buttonClassName="ml-auto px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded"
                  text={step === steps.length - 1 ? "Submit" : "Next"}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                />
                {/* <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded"
                >
                  {step === steps.length - 1 ? "Submit" : "Next"}
                </button> */}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostJobWizard;
