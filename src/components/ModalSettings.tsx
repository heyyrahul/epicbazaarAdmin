import React, { useState } from "react";
import dataJSON from '../../public/data.json';

interface FormState {
  id: string;
  para: string;
  criterion: string;
  value: string;
  type: string;
}

export const Modal = ({ closeModal, onSubmit, defaultValue }: { closeModal: () => void, onSubmit: (formState: FormState) => void, defaultValue: FormState }) => {
  // const fields = Object.keys(Object.values(dataJSON)[0]).filter((item: any) => !(item.startsWith("delta_")));

  const [formState, setFormState] = useState<FormState>(
    defaultValue || {
      id: "",
      para: "price",
      criterion: "0",
      value: "",
      type: "0",
    }
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    if (formState.id && formState.value) {
      setErrors([]);
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key === "id" ? "Bond ID" : key);
        }
        else {
          if (key === 'id') {
            if (!(Object.keys(dataJSON).includes(value) || value === "ALL")) {
              errorFields.push("INVALID_ID_" + value)
            }
          }
        }
      }
      setErrors(errorFields);
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "para" && value === 'rating' && formState.criterion > "1" && formState.criterion < "4") {
      setFormState({ ...formState, ["criterion"]: "0" });
    }
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div className="modal-container fixed z-50 flex top-25 bottom-5 " onClick={(e) => { if ((e.target as HTMLDivElement).className === "modal-container") closeModal(); }}>
      <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="w-full flex justify-end">
            <strong className="text-xl align-center cursor-pointer " onClick={closeModal} >&times;</strong>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5 justify-normal">
              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="id">Bond ID (Input "ALL" to track all bonds with paramaters below)</label>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="id" onChange={handleChange} value={formState.id} />
              </div>
              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="para">Parameter</label>
                <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  {/* Parameter select input */}
                </div>
              </div>
              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="criterion">Criterion</label>
                <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  {/* Criterion select input */}
                </div>
              </div>
              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="value">Value to give Alert</label>
                <input className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="value" onChange={handleChange} value={formState.value} />
              </div>
              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="type">Alert Type</label>
                <div className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                  {/* Alert type select input */}
                </div>
              </div>
              {errors.length > 0 && <div className="error">{errors.join(", ")}</div>}
              <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
