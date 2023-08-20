import resource
import multiprocessing
from multiprocessing import Pool
from app.compile import compile_code


# 시간 제한이 있는 컴파일 함수
def compile_with_timeout(code):
    # 시간 제한 설정 (초 단위)
    time_limit = 5

    # 이전 시간 제한 가져오기
    previous_time_limit = resource.getrlimit(resource.RLIMIT_CPU)

    # 새로운 시간 제한 설정
    resource.setrlimit(resource.RLIMIT_CPU, (time_limit, previous_time_limit[1]))

    try:
        # 코드 실행
        with Pool(processes=1) as pool:
            result = pool.apply_async(compile_code, (code,))
            try:
                # 5초 내에 결과 (오래 걸릴 경우)
                output_str = result.get(timeout=5)
            except multiprocessing.TimeoutError:
                pool.terminate()
                output_str = "Execution timed out"
    except Exception as e:
        output_str = f"Error: {str(e)}"

    # 이전 시간 제한 복원
    resource.setrlimit(resource.RLIMIT_CPU, previous_time_limit)

    return output_str
