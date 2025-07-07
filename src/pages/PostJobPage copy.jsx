import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  FileText, 
  Link as LinkIcon, 
  Upload,
  X,
  Plus
} from 'lucide-react';
import { TextInputControl, TextAreaControl, ValueSelecterControl, ImageInputControl } from '../shared/components/controls/FormControls';
import { JobCategories } from '../enums/Status';

const jobSchema = Yup.object().shape({
  postTitle: Yup.string().required("Post title required"),
  organizationName: Yup.string(),
  organizationWebsite: Yup.string(),
  aboutOrganization: Yup.string(),
  jobRole: Yup.string().required("Job Role is required"),
  qualification: Yup.string(),
  experience: Yup.string(),
  batch: Yup.string(),
  salary: Yup.string(),
  jobLocation: Yup.string(),
  lastApplyDate: Yup.string(),
  job_Description: Yup.string(),
  appyInstructions: Yup.string(),
  appyLink: Yup.string().required("Apply link is required"),
  whatsAppGroupLink: Yup.string().required("WhatsApp link is required"),
  telegramGroupLink: Yup.string(),
  instagramLink: Yup.string(),
  linkedInLink: Yup.string().required("LinkedIn link is required"),
  requirements: Yup.string(),
  short_Description: Yup.string().required("Description is required"),
  long_Description: Yup.string(),
  coverPhoto: Yup.string(),
  cardPhoto: Yup.string(),
  statusId: Yup.number().default(1),
  categoryId: Yup.number().nullable(),
  remarks: Yup.string(),
  tags: Yup.string(),
  isFeatured: Yup.boolean().default(false),
});

const PostJobPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [appyLinks, setAppyLinks] = useState(['']);
  const [coverPhotoRef, setCoverPhotoRef] = useState(null);
  const [cardPhotoRef, setCardPhotoRef] = useState(null);

  const initialValues = {
    postTitle: '',
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
    short_Description: '',
    long_Description: '',
    coverPhoto: '',
    cardPhoto: '',
    statusId: 1,
    categoryId: null,
    remarks: '',
    tags: '',
    isFeatured: false,
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Job posting data:', values);
    // Here you would typically send the data to your API
    setTimeout(() => {
      alert('Job posted successfully!');
      setSubmitting(false);
      resetForm();
      setAppyLinks(['']);
    }, 1000);
  };

  const addAppyLink = () => {
    setAppyLinks([...appyLinks, '']);
  };

  const removeAppyLink = (index) => {
    if (appyLinks.length > 1) {
      setAppyLinks(appyLinks.filter((_, i) => i !== index));
    }
  };

  const updateAppyLink = (index, value) => {
    const newLinks = [...appyLinks];
    newLinks[index] = value;
    setAppyLinks(newLinks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Post a Job</h1>
              <p className="text-xl text-gray-200">
                Find the perfect candidate for your open position
              </p>
            </div>

            {/* Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <Formik
                initialValues={initialValues}
                validationSchema={jobSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
                  <Form className="space-y-8">
                    {/* Basic Information */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Briefcase className="w-6 h-6 mr-2" />
                        Basic Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <TextInputControl
                        labelClassName='text-white-700'
                          label="Post Title"
                          name="postTitle"
                          id="postTitle"
                          value={values.postTitle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                          placeholder="e.g., Senior Frontend Developer"
                        />
                        
                        <ValueSelecterControl
                          label="Category"
                          name="categoryId"
                          id="categoryId"
                          value={values.categoryId}
                          onChange={(e) => setFieldValue('categoryId', parseInt(e.target.value))}
                          options={Object.entries(JobCategories).map(([key, value]) => ({
                            value: value,
                            label: key
                          }))}
                        />
                      </div>

                      <TextAreaControl
                        label="Short Description"
                        name="short_Description"
                        id="short_Description"
                        value={values.short_Description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors}
                        touched={touched}
                        rows={3}
                        placeholder="Brief description of the role..."
                      />
                    </div>

                    {/* Organization Details */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Building className="w-6 h-6 mr-2" />
                        Organization Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInputControl
                          label="Organization Name"
                          name="organizationName"
                          id="organizationName"
                          value={values.organizationName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        
                        <TextInputControl
                          label="Organization Website"
                          name="organizationWebsite"
                          id="organizationWebsite"
                          value={values.organizationWebsite}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="https://company.com"
                        />
                      </div>

                      <TextAreaControl
                        label="About Organization"
                        name="aboutOrganization"
                        id="aboutOrganization"
                        value={values.aboutOrganization}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={4}
                        placeholder="Tell us about your organization..."
                      />
                    </div>

                    {/* Job Details */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Job Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TextInputControl
                          label="Job Role"
                          name="jobRole"
                          id="jobRole"
                          value={values.jobRole}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                        />
                        
                        <TextInputControl
                          label="Qualification"
                          name="qualification"
                          id="qualification"
                          value={values.qualification}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        
                        <TextInputControl
                          label="Experience"
                          name="experience"
                          id="experience"
                          value={values.experience}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TextInputControl
                          label="Batch"
                          name="batch"
                          id="batch"
                          value={values.batch}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        
                        <TextInputControl
                          label="Salary"
                          name="salary"
                          id="salary"
                          value={values.salary}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="e.g., $80,000 - $120,000"
                        />
                        
                        <TextInputControl
                          label="Job Location"
                          name="jobLocation"
                          id="jobLocation"
                          value={values.jobLocation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>

                      <TextInputControl
                        label="Last Apply Date"
                        name="lastApplyDate"
                        id="lastApplyDate"
                        type="date"
                        value={values.lastApplyDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    {/* Job Description */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Job Description</h2>
                      <TextAreaControl
                        label="Job Description"
                        name="job_Description"
                        id="job_Description"
                        value={values.job_Description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={6}
                        placeholder="Detailed job description..."
                      />

                      <TextAreaControl
                        label="Apply Instructions"
                        className='hide'
                        name="appyInstructions"
                        id="appyInstructions"
                        value={values.appyInstructions}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={4}
                        placeholder="Instructions for candidates on how to apply..."
                      />

                      <TextAreaControl
                        label="Long Description"
                        name="long_Description"
                        id="long_Description"
                        value={values.long_Description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={6}
                        placeholder="Additional detailed information..."
                      />
                    </div>

                    {/* Social Links */}
                    <div className='disply-none'>
                      <h2 className="text-2xl font-semibold mb-6">Social Links</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInputControl
                          label="WhatsApp Group Link"
                          name="whatsAppGroupLink"
                          id="whatsAppGroupLink"
                          value={values.whatsAppGroupLink}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                          placeholder="https://chat.whatsapp.com/..."
                        />
                        
                        <TextInputControl
                          label="LinkedIn Link"
                          name="linkedInLink"
                          id="linkedInLink"
                          value={values.linkedInLink}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                          placeholder="https://linkedin.com/..."
                        />
                        
                        <TextInputControl
                          label="Telegram Group Link"
                          name="telegramGroupLink"
                          id="telegramGroupLink"
                          value={values.telegramGroupLink}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="https://t.me/..."
                        />
                        
                        <TextInputControl
                          label="Instagram Link"
                          name="instagramLink"
                          id="instagramLink"
                          value={values.instagramLink}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                    </div>

                    {/* Apply Links */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Apply Links</h2>
                      {appyLinks.map((link, index) => (
                        <div key={index} className="flex gap-2 mb-4">
                          <TextInputControl
                            label={`Apply Link ${index + 1}`}
                            name={`appyLink_${index}`}
                            value={link}
                            onChange={(e) => updateAppyLink(index, e.target.value)}
                            placeholder="https://company.com/apply"
                            className="flex-1"
                          />
                          {appyLinks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAppyLink(index)}
                              className="mt-6 p-2 text-red-400 hover:text-red-300"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addAppyLink}
                        className="flex items-center text-teal-300 hover:text-teal-100"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Another Apply Link
                      </button>
                    </div>

                    {/* Photos */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Photos</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Cover Photo</label>
                          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                            {values.coverPhoto ? (
                              <img src={values.coverPhoto} alt="Cover" className="max-h-32 mx-auto mb-2" />
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
                              name="coverPhoto"
                              setFieldValue={setFieldValue}
                              handleBlur={handleBlur}
                              refprop={(ref) => setCoverPhotoRef(ref)}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Card Photo</label>
                          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                            {values.cardPhoto ? (
                              <img src={values.cardPhoto} alt="Card" className="max-h-32 mx-auto mb-2" />
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
                              setFieldValue={setFieldValue}
                              handleBlur={handleBlur}
                              refprop={(ref) => setCardPhotoRef(ref)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
                      <div className="grid grid-cols-1 gap-6">
                        <TextAreaControl
                          label="Requirements"
                          name="requirements"
                          id="requirements"
                          value={values.requirements}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={4}
                          placeholder="List the requirements for this position..."
                        />
                        
                        <TextInputControl
                          label="Tags"
                          name="tags"
                          id="tags"
                          value={values.tags}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="React, JavaScript, Frontend (comma separated)"
                        />
                        
                        <TextAreaControl
                          label="Remarks"
                          name="remarks"
                          id="remarks"
                          value={values.remarks}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={3}
                          placeholder="Any additional remarks..."
                        />
                      </div>

                      <div className="flex items-center mt-4">
                        <Field
                          type="checkbox"
                          name="isFeatured"
                          className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm">
                          Mark as Featured Job
                        </label>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-white/20">
                      <button
                        type="button"
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Save as Draft
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Publishing...
                          </>
                        ) : (
                          'Publish Job'
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PostJobPage;