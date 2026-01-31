import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, update, deleteUser } from '../redux/features/authSlice';
import { updateProfile, deleteProfile } from '../api/authApi';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user?.name || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  useEffect(() => {
    if (user) {
      setTempName(user.name);
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
      await deleteProfile();
      dispatch(deleteUser());
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        const response = await updateProfile(undefined, undefined, base64);
        dispatch(update({ user: response.data }));
      } catch (error) {
        console.error("Failed to update avatar:", error);
      }
    }
  };

  const saveName = async () => {
    try {
      const response = await updateProfile(tempName, undefined, undefined);
      dispatch(update({ user: response.data }));
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update name:", error);
    }
  };


  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible relative mt-16">

          <div className="h-32 bg-linear-to-r from-indigo-600 to-purple-600 rounded-t-2xl"></div>

          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-end -mt-16 mb-6 gap-6">

              <div className="relative group">
                <img
                  src={avatarPreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
                />

                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition transform hover:scale-105"
                  title="Change Avatar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="flex-1 mb-2 w-full">

                {isEditingName ? (
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none bg-transparent w-full md:w-auto px-1"
                      autoFocus
                    />
                    <button onClick={saveName} className="text-green-600 hover:bg-green-50 p-1 rounded-md transition" title="Save">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button onClick={() => setIsEditingName(false)} className="text-red-600 hover:bg-red-50 p-1 rounded-md transition" title="Cancel">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-1 group">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Edit Name"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-500">
                  <span>{user.email}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

            </div>


          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div>
              <h3 className="font-bold text-red-700">Sign Out</h3>
              <p className="text-sm text-red-600/80">Securely log out of your account on this device.</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition shadow-sm"
            >
              Log Out
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <div>
              <h3 className="font-bold text-red-700">Delete Account</h3>
              <p className="text-sm text-red-600/80">Permanently delete your account and all associated data.</p>
            </div>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition shadow-sm"
            >
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;