import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  MapPin,
  Briefcase,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getUserPostsAction,
  removePostAction,
} from "../store/actions/JobHuntingActions ";
import { setPageConfigResetAction } from "../store/actions/PaginationAtion";
import PaginationControl from "../shared/utils/Pagination";
import { formatDate, getEnumName } from "../utils/dateFormatter";
import { JobCategories, Status } from "../enums/Status";
import ImageControl from "../components/ImageControl";
import { Modal } from "../shared/components/ui/Modal/Modal";
import { Button } from "../shared/components/ui/Button/Button";
import AlertPopUp from "../utils/AlertPopUp";

const ManagePosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const userPosts = useSelector((state) => state.jobhunting.userPosts);
  const currPage = useSelector((state) => state.pageConfig.currentPage);
  const recordsPerPage = useSelector((state) => state.pageConfig.itemsPerPage);
  const tableConfig = useSelector((state) => state.pageConfig.recordsConfig);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!isAuthenticated) {
    //   navigate("/");
    //   return;
    // }
    dispatch(setPageConfigResetAction(null));
    // fetchUserPosts();
  }, [isAuthenticated, dispatch]);

  const fetchUserPosts = (filters = {}) => {
    dispatch(
      getUserPostsAction({
        pageNumber: currPage,
        pageSize: recordsPerPage,
        name: searchTerm,
        statusId: statusFilter,
        categoryId: categoryFilter,
        ...filters,
      })
    );
  };

  const handleSearch = () => {
    fetchUserPosts({
      name: searchTerm,
      statusId: statusFilter,
      categoryId: categoryFilter,
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCategoryFilter("");
    fetchUserPosts({});
  };

  const handleDeletePost = (post) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      dispatch(
        removePostAction(
          { id: selectedPost.id },
          () => {
            AlertPopUp(200, "Post deleted successfully");
            fetchUserPosts();
            setShowDeleteModal(false);
            setSelectedPost(null);
          },
          () => {
            setShowDeleteModal(false);
          }
        )
      );
    }
  };

  const getStatusBadge = (statusId) => {
    const statusConfig = {
      [Status.Draft]: {
        label: "Draft",
        className: "bg-gray-100 text-gray-800",
        icon: <Clock className="w-3 h-3" />,
      },
      [Status.Published]: {
        label: "Published",
        className: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3" />,
      },
      [Status.InActive]: {
        label: "Inactive",
        className: "bg-red-100 text-red-800",
        icon: <X className="w-3 h-3" />,
      },
    };

    const config = statusConfig[statusId] || statusConfig[Status.Draft];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
      >
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </span>
    );
  };

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <ImageControl
          src={post?.coverPhoto}
          alt={post?.postTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4">
          {getStatusBadge(post?.statusId)}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-xl mb-1 line-clamp-1">
            {post?.postTitle}
          </h3>
          <p className="text-gray-200">{post?.organizationName}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="inline-flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4 mr-1" />
            {post?.jobLocation || "Remote"}
          </span>
          <span className="inline-flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            <Briefcase className="w-4 h-4 mr-1" />
            {getEnumName(JobCategories, post?.categoryId) || "Not Specified"}
          </span>
          <span className="inline-flex items-center text-sm bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
            {post?.salary || "Salary Not Disclosed"}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {post?.short_Description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Posted {formatDate(post?.createdDate)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/jobs/${post?.uniqueId}`)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="View Post"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate(`/post?edit=${post?.uniqueId}`)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
              title="Edit Post"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDeletePost(post)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TableRow = ({ post }) => (
    <tr className="border-b border-gray-100 hover:bg-gray-50 hover:text-black-600">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
            <ImageControl
              src={post?.coverPhoto}
              alt={post?.postTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-white-900 line-clamp-1 hover:text-black-600">
              {post?.postTitle}
            </h4>
            <p className="text-sm text-white-500">{post?.organizationName}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-white-600 hover:text-black-600">{post?.jobLocation}</td>
      <td className="px-6 py-4 text-sm text-white-600 hover:text-black-600">
        {getEnumName(JobCategories, post?.categoryId)}
      </td>
      <td className="px-6 py-4">{getStatusBadge(post?.statusId)}</td>
      <td className="px-6 py-4 text-sm text-white-600 hover:text-black-600">
        {formatDate(post?.createdDate)}
      </td>
      <td className="px-6 py-4">
        <div className="relative">
          <button
            onClick={() =>
              setShowDropdown(showDropdown === post.id ? null : post.id)
            }
            className="p-2 text-white-400 hover:text-black-600 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showDropdown === post.id && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate(`/jobs/${post?.uniqueId}`);
                    setShowDropdown(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Post
                </button>
                <button
                  onClick={() => {
                    navigate(`/post?edit=${post?.uniqueId}`);
                    setShowDropdown(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Post
                </button>
                <button
                  onClick={() => {
                    handleDeletePost(post);
                    setShowDropdown(null);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Manage Posts
                </h1>
                <p className="text-gray-200">
                  Create, edit, and manage your job postings
                </p>
              </div>
              <button
                onClick={() => navigate("/post")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center mt-4 md:mt-0"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Post
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {userPosts?.length || 0}
                    </p>
                    <p className="text-gray-300 text-sm">Total Posts</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg mr-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {userPosts?.filter(
                        (post) => post.statusId === Status.Published
                      )?.length || 0}
                    </p>
                    <p className="text-gray-300 text-sm">Published</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500/20 rounded-lg mr-4">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {userPosts?.filter(
                        (post) => post.statusId === Status.Draft
                      )?.length || 0}
                    </p>
                    <p className="text-gray-300 text-sm">Drafts</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-500/20 rounded-lg mr-4">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {tableConfig?.recordsCount || 0}
                    </p>
                    <p className="text-gray-300 text-sm">Total Views</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <select
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="" className="bg-gray-800">
                    All Status
                  </option>
                  <option value={Status.Published} className="bg-gray-800">
                    Published
                  </option>
                  <option value={Status.Draft} className="bg-gray-800">
                    Draft
                  </option>
                  <option value={Status.InActive} className="bg-gray-800">
                    Inactive
                  </option>
                </select>
                <select
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="" className="bg-gray-800">
                    All Categories
                  </option>
                  {Object.entries(JobCategories).map(([key, value]) => (
                    <option key={value} value={value} className="bg-gray-800">
                      {key}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSearch}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
                <button
                  onClick={handleResetFilters}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-200">
                {userPosts?.length || 0} posts found
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-teal-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <div className="w-5 h-5 grid grid-cols-2 gap-1">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "table"
                      ? "bg-teal-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  <div className="w-5 h-5 flex flex-col gap-1">
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Content */}
            {userPosts?.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-300 mb-6">
                  You haven't created any job posts yet. Start by creating your
                  first post.
                </p>
                <button
                  onClick={() => navigate("/post")}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Post
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPosts?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/20">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-white">
                          Post
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-white">
                          Location
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-white">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-white">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-white">
                          Created
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPosts?.map((post) => (
                        <TableRow key={post.id} post={post} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            <PaginationControl onPageChangeFetch={() => fetchUserPosts()} />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Post"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
              <div>
                <h4 className="font-medium text-red-800 mb-2">
                  Are you sure you want to delete this post?
                </h4>
                <p className="text-sm text-red-600">
                  This action cannot be undone. The post "
                  {selectedPost?.postTitle}" will be permanently deleted from
                  the system.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete} fullWidth>
              Delete Post
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default ManagePosts;
