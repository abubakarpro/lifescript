"use client";
import PIcon from "@/_assets/svg/edit-text-title-icon.svg";
import { compiledChapter, uploadImage } from "@/store/slices/chatSlice"; //uploadImage
import { Box, ButtonBase } from "@mui/material";
import {
  ContentState,
  //ContentState,
  EditorState,
  Modifier,
  convertFromRaw,
  //convertFromHTML,
  convertToRaw,
} from "draft-js";
// import htmlToDraft from "html-to-draftjs";

import styles from "./styles.module.css";
// import speechIcon from "@/_assets/svg/speeect-text-icon.svg";
import MicListing from "@/_assets/svg/mic-listing.svg";
import MicOff from "@/_assets/svg/mic-off.svg";
import MicRegular from "@/_assets/svg/mic-regular.svg";
import Button from "@/components/button/Button";
import {
  getAnswerbyId,
  getQuestionbyId,
  saveAnswer,
  updateChapterResponse,
  updateQuestion,
} from "@/store/slices/chatSlice";
import "core-js/stable";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "regenerator-runtime/runtime";
import TransitionsDialog from "@/components/modal/TransitionDialog";

// import WProofreaderSDK from "@webspellchecker/wproofreader-sdk-js";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const RichText = ({ questionId }) => {
  const router = useRouter();
  let htmlToDraftJs;

  const mediaRecorderRef = useRef(null);
  const dispatch: any = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [questionData, setQuestionData] = useState<any>({});
  const [compileChapter, setCompileChapter] = useState();

  const [recording, setRecording] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [buyPremium, setBuyPremium] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [userChapter, setUserChapter] = useState("");
  const [gptChapter, setGptChapter] = useState("");
  const [seconds, setSeconds] = useState(0);
  const { compileChapterId, openai } = router.query;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const socket = new WebSocket(
        "wss://api.deepgram.com/v1/listen?smart_format=true&language=en&model=nova-2",
        ["token", process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY]
      );

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0 && socket.readyState === 1) {
          socket.send(event.data);
        }
      });

      mediaRecorderRef.current.addEventListener("start", () => {
        console.log("MediaRecorder started");
        setRecording(true);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        console.log("MediaRecorder stopped");
        setRecording(false);
        setTranscript("");
        setDetecting(false);
        setListening(false);
      });

      socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const receivedTranscript =
          received.channel?.alternatives[0]?.transcript;
        if (receivedTranscript && received.is_final) {
          setTranscript(" " + receivedTranscript);
        }
      };

      socket.onopen = () => {
        setDetecting(false);
        setListening(true);
        console.log("WebSocket open");
      };

      socket.onclose = () => {
        console.log("WebSocket closed");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      mediaRecorderRef.current.start(1800);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleToggleRecording = () => {
    if (recording) {
      // Stop recording
      mediaRecorderRef.current.stop();
    } else {
      // Start recording
      startRecording();
    }
  };

  const handleSpeechtoText = () => {
    const jwt = require("jsonwebtoken");
    const token = localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    const accessRole = decodedToken.accessRole;
    console.log("44444",accessRole);
    if (accessRole === "PremiumPlan" || accessRole === "GoldPlan") {
      setDetecting(true);
      handleToggleRecording();
    } else {
      setBuyPremium(true);
    }
  };

  useEffect(() => {
    if (compileChapterId) {
      let htmlToDraft = null;
      if (typeof window === "object") {
        htmlToDraft = require("html-to-draftjs").default;
      }
      dispatch(compiledChapter({ id: compileChapterId }))
        .unwrap()
        .then((res) => {
          setCompileChapter(res?.chapter?.title);
          setUserChapter(res?.userText);
          setGptChapter(res?.openaiChapterText);
          const htmlContent =
            openai === "true" ? res?.openaiChapterText : res?.userText;

          const blocksFromHtml = htmlToDraft(htmlContent);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        });
    }
  }, [compileChapterId]);

  //destroys recorder instance
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // consoling editor html
  useEffect(() => {
    console.log(
      "html",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  }, [editorState]);

  //getting question
  useEffect(() => {
    if (questionId) {
      dispatch(getQuestionbyId({ id: questionId }))
        .unwrap()
        .then((res) => setQuestionData(res));
    }
    dispatch(getAnswerbyId({ id: questionId }))
      .unwrap()
      .then((res) => {
        if (res?.muteableState) {
          const contentState = convertFromRaw(
            JSON?.parse(`${res?.muteableState}`)
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      });
  }, [questionId]);

  //setting transcript in editor
  useEffect(() => {
    if (transcript) {
      const contentState = convertFromRaw({
        blocks: [
          {
            text: editorState + transcript,
            type: "unstyled",
            key: "abc",
            depth: 0, // Add depth property
            inlineStyleRanges: [], // Add inlineStyleRanges property
            entityRanges: [],
          },
        ],
        entityMap: {},
      });

      setEditorState(EditorState.createWithContent(contentState));
    }
    updateEditorWithTranscript();
  }, [transcript]);

  const updateEditorWithTranscript = () => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    const newContent = Modifier.insertText(
      currentContent,
      currentSelection,
      transcript
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      "insert-characters"
    );
    setEditorState(newEditorState);
  };
  //for grammar
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@webspellchecker/wproofreader-sdk-js").then(
        ({ default: WProofreaderSDK }) => {
          // Assuming the library has a different initialization method
          WProofreaderSDK.init({
            container: document.getElementById("draftjs-rich-text-editor"),
            autoSearch: true,
            lang: "auto",
            serviceId: process.env.NEXT_PUBLIC_SPELL_CHECKER_API_KEY,
          });
        }
      );
    }
  }, []); //to import webspellcheckr

  //autosave answer
  useEffect(() => {
    if (!openai) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 30000);
      if (questionData && questionData?.chapter?._id) {
        saveUserAnswer();
      }

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [seconds]);

  //save answer and chapter
  const saveUserAnswer = () => {
    if (!openai) {
      dispatch(
        saveAnswer({
          questionId: questionData?._id,
          chapterId: questionData?.chapter?._id,
          userText: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          muteableState: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        })
      );
    } else {
      const newData = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      dispatch(
        updateChapterResponse({
          id: compileChapterId,
          userText: openai === "false" ? newData : userChapter,
          openaiChapterText: openai === "true" ? newData : gptChapter,
        })
      )
        .unwrap()
        .then(() => router.push("/dashboard/chapters/completedChapter"));
    }
  };

  //answer completed
  const handleCompleteAnswer = () => {
    saveUserAnswer();
    dispatch(
      updateQuestion({
        text: questionData?.text,
        id: questionData?._id,
        chapter: questionData?.chapter?._id,
        status: "Completed",
      })
    )
      .unwrap()
      .then(() => {
        router.push(
          `/dashboard/chapters/chapterName?chapterId=${questionData?.chapter?._id}`
        );
      })
      .catch(() => toast.error("Failed to mark as complete"));
  };

  //for uploadin image
  const uploadCallback = (file, callback) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const form_data = new FormData();
        form_data.append("image", file);
        // const res = await dispatch(uploadImage(form_data));
        // const form_data2 = new FormData();
        // form_data2.append("api_token", "71b1bfcdf31b746dd8444631a9f563e5");
        // form_data2.append("file", file);
        // const simple = await axios.post(
        //   "https://api-service.vanceai.com/web_api/v1/upload",
        //   form_data2
        // );
        // const jconfig = {
        //   name: "matting",
        //   config: {
        //     module: "matting",
        //     module_params: {
        //       model_name: "MattingStable",
        //       rescale: 532,
        //     },
        //     out_params: {
        //       compress: {
        //         quality: 100,
        //       },
        //       dpi: 300,
        //       format: "jpg",
        //     },
        //   },
        // };
        // const form_data3 = new FormData();
        // form_data3.append("uid", simple?.data?.data?.uid);
        // form_data3.append("api_token", "71b1bfcdf31b746dd8444631a9f563e5");
        // form_data3.append("jconfig", JSON.stringify(jconfig));

        // const transform = await axios.post(
        //   "https://api-service.vanceai.com/web_api/v1/transform",
        //   form_data3
        // );

        // console.log("pppppp", transform?.data?.data?.trans_id);

        // const download = await axios.post(
        //   `https://api-service.vanceai.com/web_api/v1/download?api_token=71b1bfcdf31b746dd8444631a9f563e5&trans_id=${transform?.data?.data?.trans_id}`
        // );

        // const form_data7 = new FormData();
        // form_data7.append("image", download.data);

        const res = await dispatch(uploadImage(form_data));

        resolve({ data: { link: res.payload } });
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
    <Box className="rich-editor">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <Image alt="icon" src={PIcon} />
          <div className={styles.overflowQuestionText}>
            {questionData?.text ? questionData?.text : compileChapter}
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: { xs: "wrap", lg: "nowrap" },
            }}
          >
            <Button
              image={detecting ? MicRegular : listening ? MicListing : MicOff}
              title={
                detecting
                  ? `Detecting...`
                  : listening
                  ? "Stop"
                  : "Speech-to-text"
              }
              background="#fff"
              borderRadius="27px"
              color="#197065"
              width="155px"
              fontSize="14px"
              padding="9px 10px"
              onClick={handleSpeechtoText}
              border="1px solid #197065"
              height={undefined}
            />

            {!openai && (
              <ButtonBase
                onClick={handleCompleteAnswer}
                disabled={draftToHtml(convertToRaw(editorState.getCurrentContent())).length < 9}
                sx={{
                  height: "35px",
                  p: 2,
                  borderRadius: "27px",
                  border: "1px solid #197065",
                  color: "#197065",
                  fontSize: "14px",
                  bgcolor: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  width: "150px",
                }}
              >
                Mark As Complete
              </ButtonBase>
            )}
            <ButtonBase
              onClick={saveUserAnswer}
              sx={{
                // width: "85px",
                p: 2,
                textTransform: "none",
                height: "35px",
                fontSize: "14px",
                borderRadius: "27px",
                color: "#FFF",
                bgcolor: "#197065",
                "&:hover": {
                  backgroundColor: "#197065",
                },
              }}
            >
              Save
            </ButtonBase>
          </Box>
        </Box>
      </Box>
      <Box id="draftjs-rich-text-editor" sx={{ marginTop: "50px" }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          editorStyle={{
            borderRadius: "10px",
            minHeight: "65vh",
            maxHeight: "68vh",
            backgroundColor: "white",
            overflowY: "auto",
            padding: "20px",
          }}
          toolbarStyle={{
            minHeight: "50px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center", // Center-align toolbar items horizontally
            alignItems: "center",
          }}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "link",
              "embedded",
              "colorPicker",
              "emoji",
              "image",
              "history",
            ],
            inline: {
              options: ["bold", "italic", "underline"],
            },
            blockType: {
              options: [
                "Normal",
                "H1",
                "H2",
                "H3",
                "H4",
                "H5",
                "H6",
                "Blockquote",
                "Code",
              ],
            },
            fontSize: {
              options: [
                8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
              ],
            },
            fontFamily: {
              options: [
                "Garamond",
                "Georgia",
                "Arial",
                "Times New Roman",
                "Verdana",
                "Merriweather",
              ],
            },
            list: {
              options: ["unordered", "ordered"],
            },
            textAlign: {
              options: ["left", "center", "right"],
            },
            link: {
              showOpenOptionOnHover: true,
              defaultTargetOption: "_self",
              options: ["link"],
            },
            embedded: {
              defaultSize: {
                height: "auto",
                width: "auto",
              },
            },
            image: {
              // urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: false,
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png",
              uploadCallback: uploadCallback,
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: "auto",
                width: "400px",
              },
            },
            history: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ["undo", "redo"],
            },
          }}
        />
      </Box>
    </Box>

    <TransitionsDialog
        open={buyPremium}
        heading="Buy Premium"
        description="Speech to Text is  only available for Standard and Premium users. Want to buy now?"
        cancel={() => {
          setBuyPremium(false);
        }}
        closeModal={() => {
          setBuyPremium(false);
        }}
        proceed={()=>router.push("/dashboard/SubscribePlans")}
      />
    </>
  );
};

export default RichText;
