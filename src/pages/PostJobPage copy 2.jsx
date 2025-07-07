import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Building, FileText, Link, Upload, Image, ClipboardList } from 'lucide-react';

const steps = ['Basic Info', 'Organization Info', 'Job Details', 'Links', 'Photos & Remarks'];

const initialValues = {
  postTitle: '',
  categoryId: null,
  short_Description: '',
  organizationName: '',
  organizationWebsite: '',
  aboutOrganization: '',
  jobRole: '',
  qualification: '',
  experience: '',
  batch: '',
  salary: '',
  jobLocation: '',
  lastApplyDate: '',
  job_Description: '',
  appyInstructions: '',
  appyLink: '',
  whatsAppGroupLink: '',
  telegramGroupLink: '',
  instagramLink: '',
  linkedInLink: '',
  requirements: '',
  long_Description: '',
  coverPhoto: '',
  cardPhoto: '',
  statusId: 1,
  remarks: '',
  tags: '',
  isFeatured: false,
};

const validationSchema = Yup.object({
  postTitle: Yup.string().required('Required'),
  short_Description: Yup.string().required('Required'),
  jobRole: Yup.string().required('Required'),
  appyLink: Yup.string().required('Required'),
  whatsAppGroupLink: Yup.string().required('Required'),
  linkedInLink: Yup.string().required('Required'),
});

const Stepper = ({ steps, currentStep }) => (
  <div className="flex justify-between mb-8">
    {steps.map((label, index) => (
      <div
        key={index}
        className={`text-sm text-center flex-1 ${index <= currentStep ? 'text-white font-bold' : 'text-white/40'}`}
      >
        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${index <= currentStep ? 'bg-teal-500' : 'bg-gray-500'}`}>{index + 1}</div>
        {label}
      </div>
    ))}
  </div>
);

const InputField = ({ label, name, type = 'text', ...props }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-white">{label}</label>
    <Field
      id={name}
      name={name}
      type={type}
      className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
      {...props}
    />
    <ErrorMessage name={name} component="div" className="text-red-400 text-sm mt-1" />
  </div>
);

const TextAreaField = ({ label, name, ...props }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-1 text-sm font-medium text-white">{label}</label>
    <Field
      as="textarea"
      id={name}
      name={name}
      className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none"
      {...props}
    />
    <ErrorMessage name={name} component="div" className="text-red-400 text-sm mt-1" />
  </div>
);

const PostJobWizard = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (values) => {
    console.log('Final values', values);
    alert('Job Posted Successfully!');
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <InputField label="Post Title" name="postTitle" />
            <InputField label="Category ID" name="categoryId" type="number" />
            <TextAreaField label="Short Description" name="short_Description" rows={3} />
          </>
        );
      case 1:
        return (
          <>
            <InputField label="Organization Name" name="organizationName" />
            <InputField label="Organization Website" name="organizationWebsite" />
            <TextAreaField label="About Organization" name="aboutOrganization" rows={4} />
          </>
        );
      case 2:
        return (
          <>
            <InputField label="Job Role" name="jobRole" />
            <InputField label="Qualification" name="qualification" />
            <InputField label="Experience" name="experience" />
            <InputField label="Batch" name="batch" />
            <InputField label="Salary" name="salary" />
            <InputField label="Job Location" name="jobLocation" />
            <InputField label="Last Apply Date" name="lastApplyDate" type="date" />
            <TextAreaField label="Job Description" name="job_Description" rows={5} />
          </>
        );
      case 3:
        return (
          <>
            <TextAreaField label="Apply Instructions" name="appyInstructions" rows={3} />
            <InputField label="Apply Link" name="appyLink" />
            <InputField label="WhatsApp Group Link" name="whatsAppGroupLink" />
            <InputField label="Telegram Link" name="telegramGroupLink" />
            <InputField label="Instagram Link" name="instagramLink" />
            <InputField label="LinkedIn Link" name="linkedInLink" />
          </>
        );
      case 4:
        return (
          <>
            <TextAreaField label="Requirements" name="requirements" rows={4} />
            <TextAreaField label="Long Description" name="long_Description" rows={4} />
            <InputField label="Cover Photo URL" name="coverPhoto" />
            <InputField label="Card Photo URL" name="cardPhoto" />
            <TextAreaField label="Remarks" name="remarks" rows={3} />
            <InputField label="Tags (comma-separated)" name="tags" />
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Post a Job</h1>
        <Stepper steps={steps} currentStep={step} />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => (step === steps.length - 1 ? handleSubmit(values) : handleNext())}
        >
          <Form>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
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
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded"
              >
                {step === steps.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PostJobWizard;
