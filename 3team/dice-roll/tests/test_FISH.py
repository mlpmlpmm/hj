import os

from iconsdk.builder.transaction_builder import DeployTransactionBuilder, CallTransactionBuilder
from iconsdk.builder.call_builder import CallBuilder #iconsdk 에서 내가 필요한 모듈 callbuilder
from iconsdk.icon_service import IconService
from iconsdk.libs.in_memory_zip import gen_deploy_data_content #iconsdk libs.in memory 에서 모둘 gen 쓰는
from iconsdk.providers.http_provider import HTTPProvider
from iconsdk.signed_transaction import SignedTransaction

from tbears.libs.icon_integrate_test import IconIntegrateTestBase, SCORE_INSTALL_ADDRESS

DIR_PATH = os.path.abspath(os.path.dirname(__file__))


class TestABCToken(IconIntegrateTestBase):#클래스 이름과 icon기능을 쓰게다는
    TEST_HTTP_ENDPOINT_URI_V3 = "http://127.0.0.1:9000/api/v3"# 로컬
    SCORE_PROJECT= os.path.abspath(os.path.join(DIR_PATH, '..')) #경로

    def setUp(self):
        super().setUp() #프로젝트의 자세한 정보를 어떻게 정의할 것인

        self.icon_service = None
        # if you want to send request to network, uncomment next line and set self.TEST_HTTP_ENDPOINT_URI_V3
        # self.icon_service = IconService(HTTPProvider(self.TEST_HTTP_ENDPOINT_URI_V3))

        # install SCORE
        self._score_address = self._deploy_score()['scoreAddress'] #스코어

    def _deploy_score(self, to: str = SCORE_INSTALL_ADDRESS) -> dict: #SCORE 배포를위한 트랜잭션 인스턴스를 생성합니다.

        transaction = DeployTransactionBuilder() \
            .from_(self._test1.get_address()) \
            .to(to) \
            .step_limit(100_000_000_000) \
            .nid(3) \
            .nonce(100) \
            .content_type("application/zip") \
            .content(gen_deploy_data_content(self.SCORE_PROJECT)) \
            .build()


        signed_transaction = SignedTransaction(transaction, self._test1) # 서명이있는 서명 된 트랜잭션 객체를 반환합니다.

        # 로컬에서 거래 처리
        tx_result = self.process_transaction(signed_transaction, self.icon_service)

        self.assertTrue('status' in tx_result)
        self.assertEqual(1, tx_result['status'])
        self.assertTrue('scoreAddress' in tx_result)

        return tx_result

    def test_score_update(self):
        # Generates a call instance using the CallBuilder
        call = CallBuilder().from_(self._test1.get_address()) \
            .to(self._score_address) \
            .method("hello") \
            .build()
        # update SCORE
        tx_result = self._deploy_score(self._score_address)
        self.assertEqual(self._score_address, tx_result['scoreAddress'])



        # Sends the call request
        response = self.process_call(call, self.icon_service)
        # self.assertEqual("Hello", response)

    def test_hello(self):
        call_getGameResult = CallBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .method("hello") \
            .build()

        response = self.process_call(call_getGameResult, self.icon_service)
        print("hello : ", response)


    def test_game(self):
        #CallBuildern을 사용하여호출 인스턴스 생성
        params = {
            "_choice": 1,
            "_time": 1
        }

        transaction = CallTransactionBuilder() \
            .from_(self._test1.get_address()) \
            .to(self._score_address) \
            .step_limit(10_000_000) \
            .nid(3) \
            .nonce(100) \
            .value(2000000000000000000)\
            .method("game_start") \
            .params(params) \
            .build()

        # 서명이있는 서명 된 트랜잭션 객체를 반환합니다.
        signed_transaction = SignedTransaction(transaction, self._test1)
        # print("signed_transaction: ", signed_transaction)
        txresult = self.process_transaction(signed_transaction, self.icon_service)
        print("txresult: ", txresult)
        # txresult = self.process_transaction(signed_transaction, self.icon_service)
        # print("txresult: ", txresult)