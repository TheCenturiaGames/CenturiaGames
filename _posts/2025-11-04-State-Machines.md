---
layout: post
title: "A Look Into Our Engine: States Machines"
date: 2025-11-04
categories: Celtic Development
---
This blog post outlines the workflow to create state machines for our custom game engine, from the process to create clips and save them, to create triggers and the inspector. Prepared by one of our team programmers Pablo García , UPC student specializing in engine programming.

**State Machine Resource**

Once the entire animation system was completed, I began implementing the state machine.
The first step was creating the resource responsible for managing the states, their corresponding clips, the transitions between them, and the triggers that activate those transitions.

In this stage, I built the foundation — the ability to add, remove, and edit clips, states, and transitions, each identified by a unique name.

Each state contains its associated clip. Transitions connect two states by defining the source, destination, and interpolation time between them, ensuring smooth changes between animations.
Clips store a reference to the original animation resource along with playback parameters such as looping and, in the future, playback speed.

**State Machine Editor Creation**

The State Machine Editor is responsible for allowing the creation, editing, and deletion of the elements listed in the State Machine Resource through a graphical interface using ImNodeFlow.

The editor enables the visual construction of the state machine, where each node represents an animation state and the connections between them represent transitions. Through this interface, users can add new states, assign an animation clip to each, and define their position within the graph.

When a new state machine is created, a default node is automatically generated, serving as the base for building the rest of the machine. Transitions can be created by connecting one state to another, specifying the triggers that activate them and the interpolation times between animations.

The State Machine Editor is linked to both the State Machine Manager and the State Machine Resource. Every time a change is made to a state, clip, or transition, the resource is updated. When the user saves the state machine, it is stored through the **State Machine Manager**.

**Save and Load Functionalities**

When saving a state machine, it connects to the **State Machine Manager**. During this sprint, I focused on refining the saving and loading methods for state machines.

In the saving process, the internal data of the state machine is converted into a hierarchical structure that includes unique identifiers, the resource name, and all other relevant elements.

Once this structure is created and stored in a JSON file, corresponding files are generated both in the project’s asset folder and in its internal library, along with the necessary metadata file.

During the loading process, the operation is reversed: the file associated with the previously saved state machine is opened, its JSON analyzed, and the objects reconstructed from it.

I also added functionalities to query all existing state machines, list them when opening the editor, or retrieve the UID of a state machine simply by its name.

**State Machine Inspector**

In addition to the graph, I added a side inspector that displays the properties of the selected node — for instance, the associated clip, which can be selected via a dropdown connected to the list of available animations.

The inspector also allows toggling whether the clip loops or not, and viewing the transitions linked to that state.

As with the graph, any change — such as modifying the animation or toggling the loop setting — is directly connected to the State Machine Resource, which updates the corresponding data.

**Trigger Creation and Saving.**

Once both the editor and inspector were functional, I worked on implementing the trigger system.

I added an inspector panel where users can add **triggers** with any names they wish. Once created, these are added to a list stored in the State Machine Resource and become available for selection within the state machine inspector.

There, with the transitions already listed, I added a dropdown containing the saved triggers so that users can easily assign a trigger to each transition.

After integrating triggers into both the editor and resource, I also needed to ensure they were saved properly, so I modified the State Machine Manager to store the triggers associated with each state machine.

**Link State Machine to the Animation Component**

Once the state machine system was completed, the next step was to make it actually execute animations.

To achieve this, I added a dropdown in the Animation Component allowing users to select which state machine to link. Once linked, the triggers stored in the state machine appear as buttons, allowing transitions to be activated without relying on code — simply by pressing the trigger button.

After this, I made the necessary modifications to the **Animation Component**:
If the component has an associated state machine, it will execute the animation currently active within that machine. Thus, when playing the animation component, the active animation from the state machine is shown, and pressing the trigger associated with a transition will smoothly move to the next animation.

**Implement Interpolation**

After implementing animation switching via the state machine, it was important to ensure proper interpolation between them.

For this, I used the existing interpolation system between keyframes of a single animation as a base to implement blending between two separate animations.

In general terms, if there is an active transition toward another animation, the system **calculates the blend weight between both and combines the results of position, rotation, and scale from the relevant channels, producing a progressive interpolation for a smooth transition**.
Once the transition finishes, the target animation becomes the primary one, and the previous animation is released. If an animation reaches its end and is not set to loop, playback stops automatically.