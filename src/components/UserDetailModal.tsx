import { useEffect, useRef } from "react";
import type { User } from "../models/models";

interface UserDetailModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailModal = ({ user, isOpen, onClose }: UserDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", onOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [isOpen, onClose]);

  // Close modal on escape key press
  useEffect(() => {
    const onEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", onEscKey);
    }

    return () => {
      document.removeEventListener("keydown", onEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Create Google Maps link using geo coordinates
  const mapLink = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn"
      >
        <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Personal Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Username:</span> {user.username}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {user.phone}
                </p>
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user.website}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Address
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Street:</span>{" "}
                  {user.address.street}
                </p>
                <p>
                  <span className="font-medium">Suite:</span>{" "}
                  {user.address.suite}
                </p>
                <p>
                  <span className="font-medium">City:</span> {user.address.city}
                </p>
                <p>
                  <span className="font-medium">Zipcode:</span>{" "}
                  {user.address.zipcode}
                </p>
                <p>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors"
                  >
                    View on Map
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Company
            </h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {user.company.name}
              </p>
              <p>
                <span className="font-medium">Catch Phrase:</span> "
                {user.company.catchPhrase}"
              </p>
              <p>
                <span className="font-medium">Business:</span> {user.company.bs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
