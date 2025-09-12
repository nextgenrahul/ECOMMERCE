import axios from "axios";
import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";

const ColorManager = ({ token }) => {
  const { backendUrl, setLoading } = useContext(AdminContext);
  const [color, setColor] = useState("");
  const [colors, setColors] = useState([]);
  const [colorHex, setColorHex] = useState("");
  const [colorId, setColorId] = useState("");

  const getColorList = useCallback(async () => {
    setLoading(true);
    try {
      if (token) {
        const { data } = await axios.get(`${backendUrl}/api/color/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          setColors(data.data);
        } else {
          toast.error(data.message || "Failed to fetch color list");
        }
      }
    } catch (error) {
      console.error("Color fetch error:", error);
      toast.error("Server error while fetching colors");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, token, setLoading]);

  const handleSubmit = useCallback(async () => {
    if (!color || !colorHex) {
      return toast.error("Both values are required");
    }

    const payload = {
      color: color.trim(),
      colorHex: colorHex.trim(),
    };

    try {
      let res;
      setLoading(true);
      if (colorId) {
        payload.colorId = colorId;
        res = await axios.post(`${backendUrl}/api/color/updateColor`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await axios.post(`${backendUrl}/api/color/addColor`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const data = res.data;

      if (data.success) {
        getColorList();
        toast.success(
          colorId ? "Color successfully updated" : "Color successfully added"
        );
        setColor("");
        setColorHex("");
        setColorId("");
      } else {
        toast.error(data.message || "Error occurred");
      }
    } catch (error) {
      console.error("Submit color error:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, color, colorId, colorHex, token, setLoading, getColorList]);

  const handleEdit = (id, name, hex) => {
    if (id && name && hex) {
      setColorHex(hex);
      setColor(name);
      setColorId(id);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return toast.error("Color ID missing");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/color/deleteColor`,
        { colorId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Color deleted successfully");
        getColorList();
        setColors((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(data.message || "Error while deleting color");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getColorList();
  }, [getColorList]);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Color Manager
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Color Name"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Hex Code (e.g. #FF5733)"
          value={colorHex}
          onChange={(e) => setColorHex(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-auto"
        />
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2 font-medium"
        >
          {colorId ? "Update Color" : "Add Color"}
        </button>
      </div>

      {/* Color List */}
      <ul className="space-y-4">
        {colors?.map((color) => (
          <li
            key={color._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-md p-4 hover:shadow-lg transition rounded-lg"
          >
            {/* Color Info Section */}
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <div
                className="w-10 h-10 rounded-full border"
                style={{ backgroundColor: color.colorHex }}
              ></div>
              <div>
                <div className="font-medium text-gray-800 text-base sm:text-lg">
                  {color.colorName}
                </div>
                <div className="text-sm text-gray-500">{color.colorHex}</div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
              <button
                onClick={() =>
                  handleEdit(color._id, color.colorName, color.colorHex)
                }
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(color._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(ColorManager);
