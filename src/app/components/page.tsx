import React from "react";
import { Checkbox } from "../_components/ui/checkbox";

const Components = () => {
  return (
    <div>
      <ComponentWrapper label="Checkbox">
        <div className="flex items-center space-x-2">
          <Checkbox />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
      </ComponentWrapper>
    </div>
  );
};

const ComponentWrapper = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-2xl font-bold">{label}</label>
      {children}
    </div>
  );
};

export default Components;
