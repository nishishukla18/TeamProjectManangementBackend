import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },

    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },

    // Link project to workspace
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    // Creator reference
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // Members invited to the project
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    // Invite link (generated dynamically)
    inviteLink: { type: String, unique: true },
  },
  { timestamps: true }
);

// Automatically create an invite link
projectSchema.pre("save", function (next) {
  if (!this.inviteLink) {
    this.inviteLink = `https://yourapp.com/invite/${this._id.toString()}`;
  }
  next();
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
