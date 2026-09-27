"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { CiStar, CiTimer } from "react-icons/ci";
import { SlEnergy } from "react-icons/sl";
import { IWorkout } from "@/type/type";
import { MdCancel } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FitLogContext } from "@/context/FitContext";
import { toast } from "react-toastify";

interface IMyPlanCardProps {
  workout: IWorkout;
  isPlan: boolean;
}

const MyPlanCard = ({ workout, isPlan }: IMyPlanCardProps) => {
  const { plan, setPlan, saved, setSaved } = useContext(FitLogContext);

  const handleRemove = () => {
    if (isPlan) {
      const updatedPlan = plan.filter(
        (item) => item.id !== workout.id,
      );

      setPlan(updatedPlan);

      toast.success(`"${workout.name}" removed from today's plan`);
    } else {
      const updatedSaved = saved.filter(
        (item) => item.id !== workout.id,
      );

      setSaved(updatedSaved);

      toast.success(`"${workout.name}" removed from saved`);
    }
  };

  const handleDone = () => {
    toast.success(`"${workout.name}" marked as done`);
  };

  return (
    
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#15171D] p-4 md:flex-row md:items-center">
      <Image
        src={workout.image}
        alt={workout.name}
        width={102}
        height={110}
        className="h-20 w-32 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h2 className="font-bold uppercase text-white">
          {workout.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {workout.equipment}
        </p>

        <div className="mt-2 flex items-center gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <CiTimer />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <SlEnergy />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <CiStar />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="btn btn-sm btn-outline border-white/20 text-white"
        >
          View Details
        </Link>

        {isPlan && (
          <button
            onClick={() => handleDone()}
            className="btn btn-sm border-0 bg-[#C2F800] text-black hover:bg-[#86ab00]"
          >
            <FaRegBookmark />
            Mark as Done
          </button>
        )}

        <button
          onClick={() => handleRemove()}
          className="text-xl text-gray-500 hover:text-white"
        >
          <MdCancel />
        </button>
      </div>
    </div>
  );
};

export default MyPlanCard;
