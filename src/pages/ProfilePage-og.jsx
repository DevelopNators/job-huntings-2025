import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  User,
  Settings,
  Bell,
  Shield,
  FileText,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Globe,
  Camera,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  LogOut,
  CreditCard,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  updateUserProfile,
  updateUserPreferences,
  logout,
} from "../store/slices/userSlice";
import { Button } from "../shared/components/ui/Button/Button";
import { Input } from "../shared/components/ui/Input/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../shared/components/ui/Card/Card";
import { Modal } from "../shared/components/ui/Modal/Modal";
import { Container } from "../shared/components/layout/Container/Container";
import { appLogOutAction, appProfileAction } from "../store/actions/AuthAction";

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appProfileAction(null));
  }, []);

  const user = useSelector((state) => state.auth.profile);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.profile?.name || "",
    email: user?.profile?.email || "",
    phone: user?.profile?.phone || "",
    location: user?.profile?.location || "",
    title: user?.profile?.title || "",
    bio: user?.profile?.bio || "",
    website: user?.profile?.website || "",
    linkedin: user?.profile?.linkedin || "",
    github: user?.profile?.github || "",
    skills: user?.profile?.skills || [],
    experience: user?.profile?.experience || "mid",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: user?.preferences?.emailNotifications ?? true,
    pushNotifications: user?.preferences?.pushNotifications ?? true,
    jobAlerts: user?.preferences?.jobAlerts ?? true,
    companyUpdates: user?.preferences?.companyUpdates ?? true,
    newsletter: user?.preferences?.newsletter ?? true,
    profileVisibility: user?.preferences?.profileVisibility ?? "public",
    jobTypes: user?.preferences?.jobTypes || ["Full-time"],
    salaryRange: user?.preferences?.salaryRange || { min: 50000, max: 150000 },
    remoteWork: user?.preferences?.remoteWork ?? false,
  });

  const [newSkill, setNewSkill] = useState("");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "account", label: "Account Settings", icon: Settings },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleSavePreferences = () => {
    dispatch(updateUserPreferences(preferences));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(appLogOutAction());
    window.location.href = "/";
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    console.log("Account deletion requested");
    setShowDeleteModal(false);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user?.profile?.avatar ? (
                  <img
                    src={user?.profile?.avatar}
                    alt={user?.profile?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full hover:bg-teal-700">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.firstName + " " + user?.lastName}
                  </h2>
                  <p className="text-gray-600">
                    {user?.profile?.title || "Add your professional title"}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user?.profile?.location || "Add your location"}
                  </p>
                </div>
                <Button
                  variant={isEditing ? "primary" : "outline"}
                  onClick={() =>
                    isEditing ? handleSaveProfile() : setIsEditing(true)
                  }
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Last Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              leftIcon={<Phone className="w-4 h-4" />}
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              disabled={!isEditing}
              leftIcon={<MapPin className="w-4 h-4" />}
            />
            <Input
              label="Professional Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., Senior Frontend Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={!isEditing}
              placeholder="Tell us about yourself and your professional background..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              disabled={!isEditing}
            >
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (2-5 years)</option>
              <option value="senior">Senior Level (5-10 years)</option>
              <option value="executive">Executive Level (10+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-teal-600 hover:text-teal-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Website"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              disabled={!isEditing}
              leftIcon={<Globe className="w-4 h-4" />}
              placeholder="https://yourwebsite.com"
            />
            <Input
              label="LinkedIn Profile"
              value={formData.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              disabled={!isEditing}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Job Types
            </label>
            <div className="space-y-2">
              {[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Freelance",
              ].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.jobTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handlePreferenceChange("jobTypes", [
                          ...preferences.jobTypes,
                          type,
                        ]);
                      } else {
                        handlePreferenceChange(
                          "jobTypes",
                          preferences.jobTypes.filter((t) => t !== type)
                        );
                      }
                    }}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range (USD)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Minimum"
                type="number"
                value={preferences.salaryRange.min}
                onChange={(e) =>
                  handlePreferenceChange("salaryRange", {
                    ...preferences.salaryRange,
                    min: parseInt(e.target.value),
                  })
                }
              />
              <Input
                label="Maximum"
                type="number"
                value={preferences.salaryRange.max}
                onChange={(e) =>
                  handlePreferenceChange("salaryRange", {
                    ...preferences.salaryRange,
                    max: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.remoteWork}
                onChange={(e) =>
                  handlePreferenceChange("remoteWork", e.target.checked)
                }
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Open to remote work
              </span>
            </label>
          </div>

          <Button onClick={handleSavePreferences}>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              key: "emailNotifications",
              label: "Email Notifications",
              description: "Receive notifications via email",
            },
            {
              key: "pushNotifications",
              label: "Push Notifications",
              description: "Receive browser push notifications",
            },
            {
              key: "jobAlerts",
              label: "Job Alerts",
              description: "Get notified about new job matches",
            },
            {
              key: "companyUpdates",
              label: "Company Updates",
              description: "Updates from companies you follow",
            },
            {
              key: "newsletter",
              label: "Newsletter",
              description: "Weekly newsletter with job market insights",
            },
          ].map(({ key, label, description }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <h4 className="font-medium text-gray-900">{label}</h4>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences[key]}
                  onChange={(e) =>
                    handlePreferenceChange(key, e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          ))}

          <Button onClick={handleSavePreferences}>
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={preferences.profileVisibility}
              onChange={(e) =>
                handlePreferenceChange("profileVisibility", e.target.value)
              }
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="employers">
                Employers Only - Visible to verified employers
              </option>
              <option value="private">Private - Only visible to you</option>
            </select>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Data & Privacy</h4>
            <div className="space-y-2">
              <Button variant="outline" fullWidth className="justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download My Data
              </Button>
              <Button variant="outline" fullWidth className="justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Button>
              <Button variant="outline" fullWidth className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Terms of Service
              </Button>
            </div>
          </div>

          <Button onClick={handleSavePreferences}>Save Privacy Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" fullWidth className="justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            <Phone className="w-4 h-4 mr-2" />
            Two-Factor Authentication
          </Button>
          <Button variant="outline" fullWidth className="justify-start">
            <Eye className="w-4 h-4 mr-2" />
            Login Activity
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume & Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Your Resume
            </h3>
            <p className="text-gray-500 mb-4">
              PDF, DOC, or DOCX files up to 5MB
            </p>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Uploaded Documents</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Resume_2024.pdf</p>
                    <p className="text-sm text-gray-500">Uploaded 2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio & Work Samples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" fullWidth className="justify-start">
            <Plus className="w-4 h-4 mr-2" />
            Add Portfolio Item
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" fullWidth className="justify-start">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing & Subscription
            </Button>
            <Button variant="outline" fullWidth className="justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
            <Button variant="outline" fullWidth className="justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
            <p className="text-sm text-red-600 mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Profile Settings
              </h1>
              <p className="text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <Card>
                  <CardContent className="p-0">
                    <nav className="space-y-1">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${
                              activeTab === tab.id
                                ? "bg-teal-50 text-teal-700 border-r-2 border-teal-500"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <Icon className="w-5 h-5 mr-3" />
                            {tab.label}
                          </button>
                        );
                      })}

                      <div className="border-t border-gray-200 mt-4 pt-4">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {activeTab === "profile" && renderProfileTab()}
                {activeTab === "preferences" && renderPreferencesTab()}
                {activeTab === "notifications" && renderNotificationsTab()}
                {activeTab === "privacy" && renderPrivacyTab()}
                {activeTab === "documents" && renderDocumentsTab()}
                {activeTab === "account" && renderAccountTab()}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">
              Are you absolutely sure?
            </h4>
            <p className="text-sm text-red-600">
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </p>
          </div>

          <div className="space-y-3">
            <Input label="Type 'DELETE' to confirm" placeholder="DELETE" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount} fullWidth>
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default ProfilePage;
