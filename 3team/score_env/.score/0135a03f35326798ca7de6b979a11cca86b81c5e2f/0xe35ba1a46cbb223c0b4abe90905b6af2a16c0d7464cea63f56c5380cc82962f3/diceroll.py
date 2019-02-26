from iconservice import *

TAG = 'fishingcon'


class DiceRoll(IconScoreBase):

    def __init__(self, db: IconScoreDatabase) -> None:
        super().__init__(db)
        # 게임 결과 저장 db
        self._game_result = DictDB("GAME_RESULT", db, value_type=int)

    def on_install(self) -> None:
        super().on_install()

    def on_update(self) -> None:
        super().on_update()

    @payable
    def fallback(self):
        pass


    @external
    @payable
    def game_start(self, _choice:int, _time:str):
        amount = self.msg.value

        # 결과 database
        hash_time = sha3_256(str(_time).encode())

        # if amount <= 3:
        #     Logger.debug(f'Betting amount {amount} out of range.', TAG)
        #     revert(f'Betting amount {amount} out of range.')
        #
        # if (self.icx.get_balance(self.address)) < 2 * amount:
        #     Logger.debug(f'Not enough in treasury to make the play.', TAG)
        #     revert('Not enough in treasury to make the play.')

        # _choice: 사용자가 선택한 물고기의 값
        # 0 -> 빨강, 1 -> 파랑, 2 -> 초록

        # 내 계정 데이터베이스를 만들건지
        # 만들꺼면 어떤 형태로 만들건지가 중요

        # 물고기 데이터 - random
        game_value = int.from_bytes(sha3_256(
            self.msg.sender.to_bytes() + str(self.block.timestamp).encode()), "big") % 3



        if (game_value == _choice): # 랜덤값과 사용자가 선택한 값이 같으면
            # 이겼을때 2배 보상

            payout = int(2 * amount)
            self._game_result[hash_time] = 1
            Logger.warning("이김")
            self.icx.transfer(self.msg.sender, payout)
            Logger.warning(f"self._game_result[hash_time]: {self._game_result[hash_time]}", TAG)

        else:
            # 졌을때 0.2배 보상
            payout = int(0.2 * amount)
            self._game_result[hash_time] = 0
            Logger.warning("짐")

            # self._game_result[hash_time] = 1
            # 돈 보내기
            self.icx.transfer(self.msg.sender, payout)
            Logger.warning(f"self._game_result[hash_time]: {self._game_result[hash_time]}", TAG)


    @external
    def getGameResult(self, _time: str):
        # 넘어온 시간 데이터를 해쉬화 - 키
        hash_time = sha3_256(str(_time).encode())
        Logger.warning(f"결과: {self._game_result[hash_time]}", TAG)
        return self._game_result[hash_time]