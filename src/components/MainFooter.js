import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Button } from "../elements/index";
import First from "../pictures/First1.png";
import Second from "../pictures/Second2.png";
import Third from "../pictures/Third3.png";

import LeaderBoard from "./LeaderBoard";
import LeaderSlider from "./LeaderSlider";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const MainFooter = () => {
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.user.list);
  const user_leaders = useSelector((state) => state.user.leader_list);
  const leader_board = useSelector((state) => state.user.leader_board);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("user_list", user_list)
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const UserFaceColor = (point) => {
    let color = "black 2px";
    if (point >= 1300 && point < 1500) {
      color = "#835506 3px";
      return color;
    }
    if (point >= 1500 && point < 2000) {
      color = "#B2B2B2 3px";
      return color;
    }
    if (point >= 2000 && point < 3000) {
      color = "#FFF27E 3px";
      return color;
    }
    if (point >= 3000) {
      color = "#22E1E4 3px";
      return color;
    }
    return color;
  };

  useEffect(() => {
    dispatch(userActions.getUserDB());
    dispatch(userActions.getLeaderDB());
    dispatch(userActions.getLeaderBoardDB());
  }, []);
  return (
    <Container>
      <UserS>
        <Nemo />
        <Text is_bold is_margin="0 20px 0 0 ">
          현재 접속 유저
        </Text>
        <UserContents>
          {user_list.map((p, idx) => {
            return (
              <UserContent key={idx}>

                <Userurl color={UserFaceColor(p.point)} img={p.profileImage ? p.profileImage:"http://13.125.229.125/images/1.svg"} />

                <Text
                  is_size="20px"
                  is_color="black"
                  is_margin="4px"
                >{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>
      </UserS>
      <Ranking>
        <RankingTitle>
          <Nemo />
          <div>
            <Text is_bold is_margin="0 20px 0 0 ">
              오늘의 랭킹
            </Text>
            <Button
              is_width="80px"
              is_height="24px"
              is_margin=" 10px"
              is_border="none"
              is_background="transparent"
              is_hover="inset -2em 0 0 0 #94d7bb, inset 4em 0 0 0 #94d7bb"
            >
              <Text
                _onClick={() => {
                  openModal();
                }}
                is_bold
                is_size="20px"
              >
                더보기⇑{" "}
              </Text>
            </Button>
          </div>
          <LeaderBoard open={modalOpen} close={closeModal} header="오늘의 랭킹">
            {/* <SuperLeaders>
              <Leader>
                <FirstImg src={First} img={leader_board[0]?.profileImage} />
                <Text

                is_size="25px"
                is_bold
                is_margin=" 0 0 8px 0"
                >{leader_board[0]?.id}</Text>
                <Text>   {leader_board[0]?.point} p </Text>

              </Leader>
              <Leader>
                <SecondImg src={Second} img={leader_board[1]?.profileImage} />
                <Text
                is_size="25px"
                is_bold
                is_margin=" 0 0 8px 0"
                >{leader_board[1]?.id}</Text>
                <Text> {leader_board[1]?.point} p </Text>
              </Leader>
              <Leader>
                <ThirdImg src={Third} img={leader_board[2]?.profileImage} />
                <Text
                is_size="25px"
                is_bold
                is_margin=" 0 0 8px 0"
                >{leader_board[2]?.id}</Text>
                <Text> {leader_board[2]?.point} p</Text>
              </Leader>
            </SuperLeaders> */}
            <LeaderSlider list={leader_board} />
          </LeaderBoard>
        </RankingTitle>
        <UserContents>
          {user_leaders.map((p, idx) => {
            return (
              <UserContent key={idx}>
                <Userurl color={UserFaceColor(p.point)} img={p.profileImage ? p.profileImage:"http://13.125.229.125/images/1.svg"} />
                <Text
                  is_size="20px"
                  is_color="black"
                  is_margin="4px"
                >{`${p.id}`}</Text>
              </UserContent>
            );
          })}
        </UserContents>
      </Ranking>
      <Button
        is_width=" 362"
        is_height="103"
        is_border="none"
        is_background="transparent"
        _onClick={() => {
          window.open("https://forms.gle/AxysJH5XHe66kKDn8", "_blank");
        }}
      >
        <svg
          width="362"
          height="103"
          viewBox="0 0 362 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_416_37)">
            <rect x="15" y="7" width="340" height="81" rx="14" fill="white" />
            <rect
              x="16"
              y="8"
              width="338"
              height="79"
              rx="13"
              stroke="black"
              strokeWidth="2"
            />
          </g>
          <path
            d="M123.043 29.459C120.37 29.459 118.367 30.8125 118.367 32.8633C118.367 34.7363 119.946 35.9941 122.168 36.2471V38.373H117.369V39.8086H128.758V38.373H123.904V36.2471C126.14 36.001 127.726 34.7432 127.732 32.8633C127.726 30.8125 125.716 29.459 123.043 29.459ZM120.09 32.8633C120.09 31.6191 121.3 30.8467 123.043 30.8535C124.793 30.8467 126.003 31.6191 126.01 32.8633C126.003 34.1758 124.793 34.9072 123.043 34.9141C121.3 34.9072 120.09 34.1758 120.09 32.8633ZM139.381 29.3086H130.877V33.6836H134.254V34.873H129.469V36.2812H140.816V34.873H136.004V33.6836H139.381V29.3086ZM130.727 38.5645H137.699V41.2578H139.436V37.1973H130.727V38.5645ZM132.586 32.3164V30.6621H137.672V32.3164H132.586ZM152.957 38.4004H148.131V35.625H146.381V38.4004H141.568V39.8086H152.957V38.4004ZM142.033 34.791L142.717 36.1719C144.863 35.7822 146.463 34.6816 147.249 33.1846C148.056 34.6611 149.669 35.7207 151.85 36.1035L152.533 34.7227C149.867 34.333 148.309 32.8086 148.172 31.168H151.959V29.7598H142.512V31.168H146.312C146.162 32.8154 144.617 34.374 142.033 34.791ZM163.58 29.3086H155.076V33.6836H158.453V34.873H153.668V36.2812H165.016V34.873H160.203V33.6836H163.58V29.3086ZM154.926 38.5645H161.898V41.2578H163.635V37.1973H154.926V38.5645ZM156.785 32.3164V30.6621H161.871V32.3164H156.785ZM171.441 28.9941C168.57 28.9941 166.902 29.7461 166.902 31.1133C166.902 32.501 168.57 33.2461 171.441 33.2461C174.306 33.2461 175.96 32.501 175.967 31.1133C175.96 29.7461 174.306 28.9941 171.441 28.9941ZM165.768 35.2148H177.115V33.834H165.768V35.2148ZM167.08 37.2109H174.012V37.8945H167.094V41.1758H176.062V39.8633H168.803V39.1113H175.734V35.9395H167.08V37.2109ZM168.734 31.1133C168.728 30.5596 169.616 30.2656 171.441 30.2656C173.28 30.2656 174.162 30.5596 174.162 31.1133C174.162 31.7217 173.28 31.9609 171.441 31.9609C169.616 31.9609 168.728 31.7217 168.734 31.1133ZM185.154 29.3359C183.261 29.3223 181.88 30.4092 181.887 31.9746C181.88 33.5264 183.261 34.627 185.154 34.6133C187.055 34.627 188.436 33.5264 188.436 31.9746C188.436 30.4092 187.055 29.3223 185.154 29.3359ZM181.121 35.3789L181.34 36.8008C182.235 36.7871 183.268 36.7803 184.361 36.7324V40.8887H186.098V36.6299C187.137 36.5479 188.189 36.418 189.215 36.2129L189.105 34.9277C186.453 35.3311 183.329 35.3721 181.121 35.3789ZM183.568 31.9746C183.562 31.1816 184.225 30.7236 185.154 30.7305C186.111 30.7236 186.781 31.1816 186.781 31.9746C186.781 32.7539 186.111 33.2051 185.154 33.1914C184.225 33.2051 183.562 32.7539 183.568 31.9746ZM189.857 41.2578H191.58V28.8301H189.857V41.2578ZM203.064 28.8301H201.314V38.1133H203.064V34.0664H204.746V32.6445H203.064V28.8301ZM193.193 31.5098H200.576V30.1289H197.76V28.8027H196.023V30.1289H193.193V31.5098ZM193.795 34.3535C193.795 35.7891 195.073 36.7324 196.885 36.7324C198.689 36.7324 199.947 35.7891 199.947 34.3535C199.947 32.9111 198.689 31.9473 196.885 31.9473C195.073 31.9473 193.795 32.9111 193.795 34.3535ZM194.998 41.0391H203.516V39.6445H196.734V37.4023H194.998V41.0391ZM195.504 34.3535C195.497 33.6631 196.051 33.2803 196.885 33.2734C197.726 33.2803 198.293 33.6631 198.293 34.3535C198.293 35.0371 197.726 35.4062 196.885 35.4062C196.051 35.4062 195.497 35.0371 195.504 34.3535ZM218.582 28.7754H216.846V41.2578H218.582V34.9277H220.086V33.4648H218.582V28.7754ZM208.766 38.1953H209.395C210.386 38.2021 211.186 38.1885 212.211 38.0039L212.074 36.5684C211.521 36.6777 211.021 36.7324 210.516 36.7529V31.4551H212.006V30.0605H208.766V38.1953ZM212.648 38.1953H213.305C214.781 38.2021 215.479 38.1885 216.326 37.9766L216.189 36.541C215.629 36.6846 215.123 36.7461 214.371 36.7666V31.4551H216.012V30.0605H212.648V38.1953ZM231.967 34.5859H220.619V35.9805H231.967V34.5859ZM221.412 39.8359L222.027 41.2031C224.085 40.9297 225.548 40.1299 226.313 38.9883C227.086 40.1299 228.549 40.9297 230.6 41.2031L231.229 39.8359C228.474 39.5352 227.195 38.2568 227.195 36.9375V36.6914H225.418V36.9375C225.418 38.2568 224.153 39.5352 221.412 39.8359ZM221.672 33.7656H222.451C223.894 33.7656 224.967 33.7451 226.238 33.4922L226.102 32.0977C225.179 32.2891 224.365 32.3574 223.422 32.3848V30.7852H226.033V29.4043H221.672V33.7656ZM226.662 33.7656H230.982V32.3984H228.398V30.7852H230.914V29.4043H226.662V33.7656ZM242.59 28.8301H240.84V38.1133H242.59V34.0664H244.271V32.6445H242.59V28.8301ZM232.719 31.5098H240.102V30.1289H237.285V28.8027H235.549V30.1289H232.719V31.5098ZM233.32 34.3535C233.32 35.7891 234.599 36.7324 236.41 36.7324C238.215 36.7324 239.473 35.7891 239.473 34.3535C239.473 32.9111 238.215 31.9473 236.41 31.9473C234.599 31.9473 233.32 32.9111 233.32 34.3535ZM234.523 41.0391H243.041V39.6445H236.26V37.4023H234.523V41.0391ZM235.029 34.3535C235.022 33.6631 235.576 33.2803 236.41 33.2734C237.251 33.2803 237.818 33.6631 237.818 34.3535C237.818 35.0371 237.251 35.4062 236.41 35.4062C235.576 35.4062 235.022 35.0371 235.029 34.3535ZM257.916 28.8301H256.166V38.1133H257.916V34.0664H259.598V32.6445H257.916V28.8301ZM248.045 31.5098H255.428V30.1289H252.611V28.8027H250.875V30.1289H248.045V31.5098ZM248.646 34.3535C248.646 35.7891 249.925 36.7324 251.736 36.7324C253.541 36.7324 254.799 35.7891 254.799 34.3535C254.799 32.9111 253.541 31.9473 251.736 31.9473C249.925 31.9473 248.646 32.9111 248.646 34.3535ZM249.85 41.0391H258.367V39.6445H251.586V37.4023H249.85V41.0391ZM250.355 34.3535C250.349 33.6631 250.902 33.2803 251.736 33.2734C252.577 33.2803 253.145 33.6631 253.145 34.3535C253.145 35.0371 252.577 35.4062 251.736 35.4062C250.902 35.4062 250.349 35.0371 250.355 34.3535ZM266.516 29.9922H260.541V38.2227H266.516V29.9922ZM262.264 36.8418V31.3594H264.779V36.8418H262.264ZM268.211 41.2578H269.961V34.9551H271.793V33.5059H269.961V28.8164H268.211V41.2578ZM282.662 28.8164H280.898V41.2852H282.662V28.8164ZM272.996 38.3184H274.076C276.77 38.3184 278.355 38.2637 280.078 37.9355L279.914 36.5C278.349 36.7803 276.975 36.8418 274.746 36.8418V31.332H279.053V29.9102H272.996V38.3184ZM298.945 35.9941H287.557V37.3613H292.355V41.2578H294.078V37.3613H298.945V35.9941ZM288.896 34.791H297.592V29.2949H295.842V30.7305H290.619V29.2949H288.896V34.791ZM290.619 33.3965V32.0977H295.842V33.3965H290.619ZM306.014 29.6367H300.135V35.8574H301.174C303.689 35.8574 305.2 35.7959 306.875 35.502L306.684 34.1348C305.228 34.3945 303.915 34.4629 301.898 34.4766V33.3965H305.754V32.0566H301.898V31.0176H306.014V29.6367ZM301.16 38.2363H307.791V41.2578H309.541V36.8555H301.16V38.2363ZM307.791 36.3359H309.541V33.3008H311.223V31.8516H309.541V28.8164H307.791V36.3359ZM317.771 30.7168H315.639V29.1582H313.916V30.7168H311.756V32.0977H317.771V30.7168ZM312.043 35.6113C312.043 37.3477 313.205 38.5781 314.791 38.5781C316.384 38.5781 317.519 37.3477 317.525 35.6113C317.519 33.8818 316.384 32.665 314.791 32.6582C313.205 32.665 312.043 33.8818 312.043 35.6113ZM313.574 35.6113C313.574 34.6748 314.066 34.1074 314.791 34.1074C315.488 34.1074 315.987 34.6748 315.994 35.6113C315.987 36.5615 315.488 37.1016 314.791 37.1016C314.066 37.1016 313.574 36.5615 313.574 35.6113ZM318.236 40.7246H319.863V35.2695H320.875V41.2578H322.529V28.8164H320.875V33.875H319.863V29.0625H318.236V40.7246ZM335.258 38.373H332.729V35.29C333.665 34.709 334.226 33.8408 334.232 32.7676C334.226 30.751 332.236 29.4248 329.543 29.418C326.836 29.4248 324.867 30.751 324.867 32.7676C324.867 33.8613 325.448 34.7432 326.412 35.3242V38.373H323.869V39.8086H335.258V38.373ZM326.59 32.7676C326.59 31.5166 327.759 30.792 329.543 30.7988C331.3 30.792 332.503 31.5166 332.51 32.7676C332.503 33.9844 331.3 34.7363 329.543 34.7363C327.759 34.7363 326.59 33.9844 326.59 32.7676ZM328.135 38.373V35.96C328.572 36.042 329.044 36.0898 329.543 36.0898C330.042 36.0898 330.521 36.042 330.965 35.9531V38.373H328.135ZM338.799 30.1016H336.693L336.871 37.0332H338.621L338.799 30.1016ZM336.611 38.9746C336.598 39.6104 337.117 40.123 337.76 40.123C338.368 40.123 338.895 39.6104 338.895 38.9746C338.895 38.3457 338.368 37.833 337.76 37.8398C337.117 37.833 336.598 38.3457 336.611 38.9746Z"
            fill="black"
          />
          <path
            d="M126.023 53.543H125.109V61.2422H126.023V53.543ZM117.633 59.25L118.102 59.9766C119.338 59.5488 120.305 58.6465 120.762 57.4863C121.23 58.5645 122.197 59.3906 123.422 59.7891L123.879 59.0508C122.32 58.5762 121.201 57.3457 121.207 55.9688V55.6875H123.598V54.9492H121.219V53.5898H120.293V54.9492H117.891V55.6875H120.293V55.9688C120.293 57.4336 119.197 58.7402 117.633 59.25ZM119.297 63.7266H126.352V62.9531H120.211V60.5273H119.297V63.7266ZM131.402 55.1484V54.8438H133.734V54.082H128.121V54.8438H130.477V55.1367C130.477 56.4844 129.357 57.7852 127.84 58.3125L128.297 59.0391C129.516 58.6172 130.482 57.7031 130.945 56.584C131.396 57.5977 132.316 58.4062 133.5 58.793L133.957 58.0664C132.451 57.5859 131.396 56.3848 131.402 55.1484ZM129.668 60.1875H135.504V61.2305H129.691V63.832H136.816V63.0938H130.605V61.9336H136.418V59.4375H129.668V60.1875ZM133.406 56.625H135.504V58.9219H136.418V53.5312H135.504V55.8633H133.406V56.625ZM146.309 53.543H145.395V61.3477H146.309V57.75H147.879V56.9766H146.309V53.543ZM138.188 55.5703H144.398V54.8203H141.75V53.543H140.836V54.8203H138.188V55.5703ZM138.785 58.0898C138.779 59.2617 139.787 60.0176 141.293 60.0117C142.781 60.0176 143.789 59.2617 143.801 58.0898C143.789 56.9062 142.781 56.1445 141.293 56.1445C139.787 56.1445 138.779 56.9062 138.785 58.0898ZM139.664 58.0898C139.658 57.3457 140.309 56.8652 141.293 56.8711C142.266 56.8652 142.922 57.3457 142.934 58.0898C142.922 58.8223 142.266 59.2969 141.293 59.2852C140.309 59.2969 139.658 58.8223 139.664 58.0898ZM139.793 63.7266H146.789V62.9531H140.695V60.7266H139.793V63.7266ZM159.691 53.543H158.777V61.3477H159.691V57.75H161.262V56.9766H159.691V53.543ZM151.57 55.5703H157.781V54.8203H155.133V53.543H154.219V54.8203H151.57V55.5703ZM152.168 58.0898C152.162 59.2617 153.17 60.0176 154.676 60.0117C156.164 60.0176 157.172 59.2617 157.184 58.0898C157.172 56.9062 156.164 56.1445 154.676 56.1445C153.17 56.1445 152.162 56.9062 152.168 58.0898ZM153.047 58.0898C153.041 57.3457 153.691 56.8652 154.676 56.8711C155.648 56.8652 156.305 57.3457 156.316 58.0898C156.305 58.8223 155.648 59.2969 154.676 59.2852C153.691 59.2969 153.041 58.8223 153.047 58.0898ZM153.176 63.7266H160.172V62.9531H154.078V60.7266H153.176V63.7266ZM170.168 54.5859H165.363V61.3008H170.168V54.5859ZM166.254 60.5508V55.3242H169.254V60.5508H166.254ZM172.078 63.9492H172.992V58.4883H174.738V57.6914H172.992V53.5312H172.078V63.9492ZM183.891 53.5312H182.965V63.9727H183.891V53.5312ZM175.98 61.3828H176.824C178.934 61.377 180.305 61.3066 181.922 61.0195L181.828 60.2461C180.264 60.5273 178.934 60.5859 176.906 60.5859V55.3008H180.938V54.5273H175.98V61.3828ZM193.734 53.5312H192.82V63.9492H193.734V58.5469H195.422V57.7734H193.734V53.5312ZM185.742 61.2422L186.258 61.9688C189.65 60.293 191.033 57.6035 191.039 54.6562H186.223V55.4297H190.107C189.896 57.8965 188.432 59.9062 185.742 61.2422ZM204.363 54.5273H199.582V61.3945H200.379C202.377 61.3945 203.648 61.3242 205.184 61.0312L205.066 60.2695C203.625 60.5508 202.389 60.6152 200.508 60.6094V55.3008H204.363V54.5273ZM203.742 58.0898H206.777V63.9727H207.703V53.5312H206.777V57.3281H203.742V58.0898ZM217.629 56.6367H216.727V57.8672H212.426V58.6289H221.965V57.8672H217.629V56.6367ZM212.941 56.5781L213.246 57.2695C214.986 57.1055 216.627 56.4258 217.189 55.3301C217.752 56.4258 219.387 57.1055 221.121 57.2695L221.426 56.5781C219.609 56.4316 217.875 55.6523 217.787 54.5859H221.086V53.8594H213.305V54.5859H216.58C216.492 55.6523 214.74 56.4316 212.941 56.5781ZM213.328 60.7383H221.062V60.0117H217.641V59.0273H216.727V60.0117H213.328V60.7383ZM214.043 62.625C214.037 63.5391 215.156 64.0137 217.184 64.0078C219.193 64.0137 220.336 63.5391 220.336 62.625C220.336 61.7227 219.193 61.2598 217.184 61.2539C215.156 61.2598 214.037 61.7227 214.043 62.625ZM214.969 62.625C214.969 62.1445 215.777 61.9043 217.184 61.8984C218.596 61.9043 219.393 62.1445 219.398 62.625C219.393 63.1055 218.596 63.375 217.184 63.3633C215.777 63.375 214.969 63.1055 214.969 62.625ZM232.301 59.0273H222.809V59.7773H232.301V59.0273ZM223.863 55.9688C223.863 57.2637 225.293 58.043 227.555 58.043C229.793 58.043 231.229 57.2637 231.234 55.9688C231.229 54.6621 229.793 53.8945 227.555 53.9062C225.293 53.8945 223.863 54.6621 223.863 55.9688ZM224.039 63.7266H231.246V62.9531H224.965V60.6914H224.039V63.7266ZM224.812 55.9688C224.807 55.1543 225.873 54.6445 227.555 54.6445C229.225 54.6445 230.291 55.1543 230.297 55.9688C230.291 56.7949 229.225 57.293 227.555 57.293C225.873 57.293 224.807 56.7949 224.812 55.9688ZM239.859 56.332V54.4336H238.922V56.332C238.916 58.2539 237.709 60.2578 236.18 61.0078L236.777 61.7461C237.961 61.1191 238.939 59.7832 239.402 58.2246C239.865 59.707 240.844 60.9492 242.027 61.5586L242.578 60.8086C241.066 60.1172 239.854 58.2188 239.859 56.332ZM241.441 57.8438H243.914V63.9727H244.828V53.5312H243.914V57.0938H241.441V57.8438ZM255.152 53.5312H254.227V63.9727H255.152V53.5312ZM247.172 61.4531H252.094V54.4219H251.191V57.1758H248.086V54.4219H247.172V61.4531ZM248.086 60.6797V57.9141H251.191V60.6797H248.086ZM262.125 55.0664V54.2695H261.164V55.0664C261.158 56.8594 259.137 58.4355 257.332 58.7812L257.754 59.5547C259.33 59.1855 260.977 58.0723 261.656 56.543C262.33 58.0723 263.982 59.1914 265.559 59.5547L265.98 58.7812C264.17 58.4414 262.131 56.8535 262.125 55.0664ZM256.934 62.5312H266.473V61.7695H256.934V62.5312ZM276.832 58.3711H267.293V59.0977H276.832V58.3711ZM268.441 60.6211H274.723V61.5117H268.453V63.8086H275.977V63.1406H269.379V62.1445H275.637V59.9297H268.441V60.6211ZM268.5 54.5156H274.676V55.3711H268.535V57.5859H275.789V56.918H269.449V56.0039H275.602V53.8477H268.5V54.5156ZM285.949 54.4805H281.133V59.2734H285.949V54.4805ZM282.035 58.5352V55.2305H285.059V58.5352H282.035ZM282.316 63.7266H289.312V62.9531H283.219V60.4453H282.316V63.7266ZM287.918 61.1719H288.832V57.4805H290.402V56.707H288.832V53.5312H287.918V61.1719ZM300.562 57.9141H291.059V58.6523H300.562V57.9141ZM292.207 60.3047H298.43V61.3125H292.23V63.832H299.648V63.082H293.145V62.0039H299.332V59.5898H292.207V60.3047ZM292.324 57.0586H299.426V56.3086H293.25V54.6328H299.32V53.8945H292.324V57.0586ZM304.23 54.3398C302.689 54.3457 301.611 55.7578 301.617 57.9727C301.611 60.1934 302.689 61.5996 304.23 61.5938C305.684 61.5996 306.727 60.3223 306.826 58.2773H309.152V63.9727H310.066V53.5312H309.152V57.5156H306.814C306.674 55.5645 305.648 54.3457 304.23 54.3398ZM302.496 57.9727C302.502 56.2793 303.205 55.166 304.23 55.1602C305.25 55.166 305.965 56.2793 305.965 57.9727C305.965 59.666 305.25 60.7793 304.23 60.7734C303.205 60.7793 302.502 59.666 302.496 57.9727ZM321.34 61.8398H318.973V59.0039C319.834 58.541 320.355 57.8027 320.355 56.8711C320.355 55.2598 318.773 54.1992 316.547 54.1875C314.32 54.1992 312.738 55.2598 312.738 56.8711C312.738 57.8203 313.277 58.5703 314.168 59.0332V61.8398H311.801V62.6133H321.34V61.8398ZM313.629 56.8711C313.623 55.7051 314.836 54.9375 316.547 54.9492C318.24 54.9375 319.465 55.7051 319.465 56.8711C319.465 58.0371 318.24 58.8164 316.547 58.8164C314.836 58.8164 313.623 58.0371 313.629 56.8711ZM315.07 61.8398V59.3672C315.516 59.4844 316.014 59.543 316.547 59.543C317.092 59.543 317.596 59.4785 318.047 59.3613V61.8398H315.07ZM326.203 58.9102H322.488V59.8359H326.203V58.9102ZM329.051 54.5156H327.902L327.984 60.6094H328.969L329.051 54.5156ZM327.727 62.3086C327.715 62.7246 328.066 63.0645 328.477 63.0703C328.893 63.0645 329.232 62.7246 329.227 62.3086C329.232 61.8984 328.893 61.5586 328.477 61.5586C328.066 61.5586 327.715 61.8984 327.727 62.3086Z"
            fill="#6F6F6F"
          />
          <g filter="url(#filter1_d_416_37)">
            <mask id="path-5-inside-1_416_37" fill="white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M54.7156 22.9046L57.0195 32.5139L63.5357 30.0226L64.4045 34.0993H67.4453L69.6174 39.7613L73.7798 37.1894C74.8773 39.8744 75.4819 42.8109 75.4819 45.8879C75.4819 58.6528 65.0766 69.0007 52.2409 69.0007C39.4053 69.0007 29 58.6528 29 45.8879C29 33.1231 39.4053 22.7751 52.2409 22.7751C53.0769 22.7751 53.9025 22.819 54.7156 22.9046Z"
              />
            </mask>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M54.7156 22.9046L57.0195 32.5139L63.5357 30.0226L64.4045 34.0993H67.4453L69.6174 39.7613L73.7798 37.1894C74.8773 39.8744 75.4819 42.8109 75.4819 45.8879C75.4819 58.6528 65.0766 69.0007 52.2409 69.0007C39.4053 69.0007 29 58.6528 29 45.8879C29 33.1231 39.4053 22.7751 52.2409 22.7751C53.0769 22.7751 53.9025 22.819 54.7156 22.9046Z"
              fill="#5B5B5B"
            />
            <path
              d="M57.0195 32.5139L55.0746 32.9802L55.6058 35.1956L57.7337 34.382L57.0195 32.5139ZM54.7156 22.9046L56.6605 22.4383L56.3309 21.0636L54.9249 20.9156L54.7156 22.9046ZM63.5357 30.0226L65.4917 29.6057L65.0046 27.3198L62.8214 28.1545L63.5357 30.0226ZM64.4045 34.0993L62.4484 34.5161L62.7858 36.0993H64.4045V34.0993ZM67.4453 34.0993L69.3127 33.3829L68.8202 32.0993H67.4453V34.0993ZM69.6174 39.7613L67.7501 40.4777L68.6148 42.7318L70.6687 41.4627L69.6174 39.7613ZM73.7798 37.1894L75.6311 36.4327L74.7375 34.2466L72.7285 35.488L73.7798 37.1894ZM58.9644 32.0476L56.6605 22.4383L52.7707 23.3709L55.0746 32.9802L58.9644 32.0476ZM62.8214 28.1545L56.3053 30.6458L57.7337 34.382L64.2499 31.8907L62.8214 28.1545ZM66.3605 33.6824L65.4917 29.6057L61.5796 30.4395L62.4484 34.5161L66.3605 33.6824ZM67.4453 32.0993H64.4045V36.0993H67.4453V32.0993ZM71.4847 39.045L69.3127 33.3829L65.578 34.8156L67.7501 40.4777L71.4847 39.045ZM72.7285 35.488L68.5661 38.0599L70.6687 41.4627L74.8311 38.8908L72.7285 35.488ZM71.9284 37.9461C72.9295 40.3952 73.4819 43.0751 73.4819 45.8879H77.4819C77.4819 42.5468 76.825 39.3536 75.6311 36.4327L71.9284 37.9461ZM73.4819 45.8879C73.4819 57.5378 63.9824 67.0007 52.2409 67.0007V71.0007C66.1707 71.0007 77.4819 59.7677 77.4819 45.8879H73.4819ZM52.2409 67.0007C40.4995 67.0007 31 57.5378 31 45.8879H27C27 59.7677 38.3112 71.0007 52.2409 71.0007V67.0007ZM31 45.8879C31 34.2381 40.4995 24.7751 52.2409 24.7751V20.7751C38.3112 20.7751 27 32.0081 27 45.8879H31ZM52.2409 24.7751C53.0068 24.7751 53.7625 24.8154 54.5062 24.8936L54.9249 20.9156C54.0424 20.8227 53.1469 20.7751 52.2409 20.7751V24.7751Z"
              fill="black"
              mask="url(#path-5-inside-1_416_37)"
            />
          </g>
          <ellipse
            cx="45.3764"
            cy="45.876"
            rx="1.30323"
            ry="1.35889"
            fill="#BCBCBC"
          />
          <ellipse
            cx="57.5399"
            cy="45.876"
            rx="1.30323"
            ry="1.35889"
            fill="#BCBCBC"
          />
          <path
            d="M56.671 54.9355C55.0387 53.2265 50.6683 50.8337 46.2452 54.9355"
            stroke="#BCBCBC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36.9512 39.1396C36.4172 38.9912 36.0921 38.4271 36.2617 37.8951C37.0142 35.5346 38.2596 33.3726 39.9126 31.5674C41.5541 29.7747 43.5514 28.3844 45.7597 27.4906C46.2829 27.2789 46.8666 27.5953 47.0358 28.1521C47.1984 28.6871 46.9161 29.245 46.4144 29.4511C44.5035 30.2357 42.775 31.4453 41.3515 32.9999C39.9257 34.557 38.8457 36.4168 38.1826 38.4471C38.0113 38.9715 37.4788 39.2863 36.9512 39.1396Z"
            fill="#C4C4C4"
            fillOpacity="0.4"
          />
          <mask id="path-11-inside-2_416_37" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M107.357 54.1487C108.417 51.4719 109 48.554 109 45.5C109 32.5213 98.4787 22 85.5 22C72.5213 22 62 32.5213 62 45.5C62 58.4787 72.5213 69 85.5 69C92.0602 69 97.9926 66.3119 102.256 61.9771L109.523 64.6587C111.295 65.3128 112.903 63.3709 111.929 61.7517L107.357 54.1487Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M107.357 54.1487C108.417 51.4719 109 48.554 109 45.5C109 32.5213 98.4787 22 85.5 22C72.5213 22 62 32.5213 62 45.5C62 58.4787 72.5213 69 85.5 69C92.0602 69 97.9926 66.3119 102.256 61.9771L109.523 64.6587C111.295 65.3128 112.903 63.3709 111.929 61.7517L107.357 54.1487Z"
            fill="white"
          />
          <path
            d="M107.357 54.1487L105.498 53.4123L105.134 54.3318L105.643 55.1793L107.357 54.1487ZM102.256 61.9771L102.948 60.1007L101.736 59.6534L100.83 60.5747L102.256 61.9771ZM109.523 64.6587L108.831 66.535H108.831L109.523 64.6587ZM111.929 61.7517L110.215 62.7824L111.929 61.7517ZM107 45.5C107 48.2977 106.467 50.966 105.498 53.4123L109.217 54.885C110.368 51.9777 111 48.8102 111 45.5H107ZM85.5 24C97.3741 24 107 33.6259 107 45.5H111C111 31.4167 99.5833 20 85.5 20V24ZM64 45.5C64 33.6259 73.6259 24 85.5 24V20C71.4167 20 60 31.4167 60 45.5H64ZM85.5 67C73.6259 67 64 57.3741 64 45.5H60C60 59.5833 71.4167 71 85.5 71V67ZM100.83 60.5747C96.9272 64.5429 91.5024 67 85.5 67V71C92.6181 71 99.0581 68.0809 103.682 63.3794L100.83 60.5747ZM110.215 62.7824L102.948 60.1007L101.563 63.8534L108.831 66.535L110.215 62.7824ZM110.215 62.7824C110.222 62.7935 110.225 62.8002 110.226 62.8024C110.227 62.8046 110.226 62.8039 110.225 62.8005C110.225 62.7973 110.224 62.7929 110.224 62.7879C110.223 62.7829 110.224 62.7784 110.224 62.7745C110.225 62.7668 110.226 62.7644 110.225 62.767C110.224 62.77 110.221 62.7758 110.215 62.7824C110.21 62.789 110.205 62.7932 110.202 62.795C110.2 62.7965 110.202 62.7947 110.209 62.7924C110.213 62.7913 110.217 62.7903 110.222 62.7896C110.227 62.789 110.232 62.7888 110.235 62.7889C110.238 62.789 110.239 62.7893 110.237 62.7889C110.235 62.7884 110.227 62.7869 110.215 62.7824L108.831 66.535C112.376 67.8432 115.591 63.9595 113.643 60.7211L110.215 62.7824ZM105.643 55.1793L110.215 62.7824L113.643 60.7211L109.071 53.118L105.643 55.1793Z"
            fill="black"
            mask="url(#path-11-inside-2_416_37)"
          />
          <circle cx="79.5701" cy="44.1495" r="1.31776" fill="black" />
          <circle cx="91.8691" cy="44.1495" r="1.31776" fill="black" />
          <g filter="url(#filter2_f_416_37)">
            <circle cx="71.8832" cy="49.2008" r="2.85514" fill="#FFCACA" />
          </g>
          <g filter="url(#filter3_f_416_37)">
            <circle cx="99.117" cy="49.2008" r="2.85514" fill="#FFCACA" />
          </g>
          <path
            d="M80 51C81.7222 54.0185 86.3333 58.2444 91 51"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <filter
              id="filter0_d_416_37"
              x="0"
              y="0"
              width="362"
              height="103"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="3"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_416_37"
              />
              <feOffset dx="-4" dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_416_37"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_416_37"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_416_37"
              x="14"
              y="15.7751"
              width="68.4819"
              height="68.2256"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="3"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_416_37"
              />
              <feOffset dx="-4" dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.823529 0 0 0 0 0.705882 0 0 0 0 0.564706 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_416_37"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_416_37"
                result="shape"
              />
            </filter>
            <filter
              id="filter2_f_416_37"
              x="65.0281"
              y="42.3457"
              width="13.7103"
              height="13.7102"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_416_37"
              />
            </filter>
            <filter
              id="filter3_f_416_37"
              x="92.2618"
              y="42.3457"
              width="13.7103"
              height="13.7102"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_416_37"
              />
            </filter>
          </defs>
        </svg>
      </Button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  margin: 0 20% 0 8%;
  width: 70%;
  max-widit: 900px; ;
`;
const UserS = styled.div`
  width: 28%;
  height: 100px;
  max-height: 100px;
  margin: 0 3% 0 0;
  display: flex;
`;
const Ranking = styled.div`
  width: 26%;
  height: 100px;
  display: flex;
  margin: 0 3% 0 0;
`;
const UserContents = styled.div`
  width: 180px;
  border: solid 1px black;
  height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  border-radius: 10px;
  box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.25);
`;
const UserContent = styled.div`
  height: 30px;
  display: flex;
  margin: 6px;
`;
const Userurl = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 20px;
  border: solid ${(props) => props.color};
  background: #f0f0f0;
  background-image : url(${(props) => props.img});
  background-size : contain;
  background-repeat: no-repeat;
`;
const RankingTitle = styled.div`
  display: flex;
`;
const Nemo = styled.div`
  width: 15px;
  height: 15px;
  background-color: #94d7bb;
  margin: 4px 3px 0 0;
`;

const SuperLeaders = styled.div`
  display: flex;
  width: 100%;
  margin: 5% 18%;
`;
const Leader = styled.div`
  width: 20%;
  height: 20%;
  text-align: center;
`;
const FirstImg = styled.img`
  width: 50%;
  height: 50%;
`;
const SecondImg = styled.img`
  width: 50%;
  height: 50%;
`;
const ThirdImg = styled.img`
  width: 50%;
  height: 50%;
`;
export default MainFooter;
