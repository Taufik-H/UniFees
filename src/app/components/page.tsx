import React from "react";
import { Checkbox } from "../_components/ui/checkbox";
import { Button } from "../_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { Skeleton } from "../_components/ui/skeleton";
import { Switch } from "../_components/ui/switch";
import { DatePicker } from "../_components/ui/datepicker";
import { Calendar } from "../_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../_components/ui/popover";

const Components = () => {
  return (
    <div>
      {/**@see https://ui.shadcn.com/docs/components/checkbox */}
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
      {/**@see https://ui.shadcn.com/docs/components/button */}
      <ComponentWrapper label="Button">
        <div className="flex gap-2">
          <Button>Button</Button>
          <Button variant="destructive">Button</Button>
          <Button variant="ghost">Button</Button>
          <Button variant="link">Button</Button>
          <Button variant="outline">Button</Button>
          <Button variant="secondary">Button</Button>
        </div>
      </ComponentWrapper>
      {/**@see https://ui.shadcn.com/docs/components/select */}
      <ComponentWrapper label="Select">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </ComponentWrapper>
      {/**@see https://ui.shadcn.com/docs/components/skeleton */}
      <ComponentWrapper label="Skeleton">
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-64" />
        </div>
      </ComponentWrapper>
      {/**@see https://ui.shadcn.com/docs/components/label */}
      <ComponentWrapper label="Switch">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Airplane Mode
          </label>
        </div>
      </ComponentWrapper>
      {/**@see https://ui.shadcn.com/docs/components/calendar */}
      <ComponentWrapper label="Calendar">
        <Calendar mode="single" className="max-w-fit rounded-md border" />
      </ComponentWrapper>
      {/**@see https://ui.shadcn.com/docs/components/popover */}
      <ComponentWrapper label="Popover">
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </ComponentWrapper>

      <ComponentWrapper label="Datepicker">
        <DatePicker />
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
      <label className="mb-4 block text-2xl font-bold">{label}</label>
      {children}
    </div>
  );
};

export default Components;
