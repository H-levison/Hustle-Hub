import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Vite env type declaration for TypeScript
// (If you already have this in a global.d.ts or env.d.ts, you can remove this block)
declare global {
  interface ImportMeta {
    env: {
      VITE_API_BASE_URL?: string;
      [key: string]: any;
    };
  }
}

const VendorRegistrationModal = ({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (open) {
      fetch("http://localhost:5000/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch(() => setCategories([]));
    }
  }, [open]);

  // For testing: use fixed categories
  // React.useEffect(() => {
  //   if (open) {
  //     setCategories([
  //       { id: '1', name: 'Food & Beverages' },
  //       { id: '2', name: 'Fashion & Apparel' },
  //       { id: '3', name: 'Electronics' },
  //       { id: '4', name: 'Home & Living' },
  //       { id: '5', name: 'Services' },
  //     ]);
  //   }
  // }, [open]);

  const validateWhatsapp = (num: string) => /^\+[1-9]\d{7,14}$/.test(num);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!storeName || !description || !whatsapp || !category) {
      setError("All fields are required.");
      return;
    }
    if (!validateWhatsapp(whatsapp)) {
      setError(
        "WhatsApp number must start with + and country code, e.g. +2507xxxxxxx"
      );
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // 1. Become vendor (set is_provider=True)
      const becomeRes = await fetch(`${API_BASE}/user/become-vendor`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      // if (!becomeRes.ok) {
      //   setError('Failed to become vendor.');
      //   setLoading(false);
      //   return;
      // }
      if (!becomeRes.ok) {
        const errData = await becomeRes.json(); // 👈 Add this
        console.log("Become vendor error response:", errData); // 👈 Add this
        setError("Failed to become vendor.");
        setLoading(false);
        return;
      }
      const becomeData = await becomeRes.json();
      if (
        becomeData.message !== "You are now a vendor" &&
        becomeData.message !== "Already a vendor"
      ) {
        setError("Failed to become vendor.");
        setLoading(false);
        return;
      }
      // 2. Find category_id from selected category name
      const selectedCat = categories.find((cat) => cat.name === category);
      if (!selectedCat) {
        setError("Invalid category.");
        setLoading(false);
        return;
      }
      // 3. Create business (store) without logo
      const res = await fetch(`${API_BASE}/businesses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: storeName,
          description,
          whatsapp,
          category_id: selectedCat.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create store.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.is_provider = true;
        localStorage.setItem("user", JSON.stringify(user));
      }
      // console.log(data);
      setLoading(false);
      window.location.reload();
      // onSuccess();
      // Clear user data from localStorage
      // localStorage.removeItem("token");
      // localStorage.removeItem("user");
      // navigate("/auth/login");
    } catch (err) {
      console.log(err);
      setError("Server error. Try again.");
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold mb-4">Become a Vendor</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Store Name*
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Short Description*
            </label>
            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              WhatsApp Number*
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+2507xxxxxxx"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Store Category*
            </label>
            <select
              className="w-full border p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Store"}
          </button>
        </form>
      </div>
    </div>
  );
};

const VendorBanner: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("Become a vendor");

  const handleBecomeVendor = async () => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!userStr || !token) {
      navigate("/auth/login");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.is_provider) {
      navigate("/vendorshop");
      return;
    }
    setShowModal(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user?.is_provider) {
        setButtonText("Open Vendor Shop")
      }
    }
  }, []);

  const handleSuccess = () => {
    setShowModal(false);
    // Optionally update user state here
    navigate("/vendorshop");
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-2 sm:px-4 md:px-[80px] mt-4 sm:mt-[20px]">
      <VendorRegistrationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
      />
      <section className="w-full py-6 sm:py-12 px-2 sm:px-6 md:px-[80px] bg-[#10194A] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 leading-tight">
            Showcase
            <br className="hidden sm:block" />
            your products and services today!
          </h2>
          <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
            Whether you sell food, fashion, gadgets, or offer essential
            services, HustleHub gives you the space to reach students on campus
            with ease. Set up your shop, grow your brand, and get discovered by
            the right customers.
          </p>
          <button
            className="bg-white text-[#10194A] font-semibold rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base shadow hover:bg-gray-100 transition"
            onClick={handleBecomeVendor}
          >
            {buttonText}
          </button>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center w-full max-w-xl">
          <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 w-full h-40 sm:h-[320px]">
            <img
              src="https://pbs.twimg.com/media/FmC619lagAAT9GN.jpg"
              alt="Vendor point"
              className="rounded-xl col-span-1 row-span-2 h-full w-full object-cover"
            />

            <img
              src="https://pbs.twimg.com/media/GwC7JrqWwAAg0Hu?format=jpg&name=4096x4096"
              alt="Vendor point"
              className="rounded-xl col-span-1 row-span-2 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorBanner;
