import os
import sys
import time
from concurrent.futures import ProcessPoolExecutor

try:
    from rembg import remove, new_session
    from PIL import Image
except ImportError:
    print("Please install dependencies: pip install rembg pillow")
    sys.exit(1)

def process_single_frame(i):
    input_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'public', 'resources'))
    frame_str = str(i).zfill(3)
    input_path = os.path.join(input_dir, f'ezgif-frame-{frame_str}.jpg')
    output_path = os.path.join(input_dir, f'ezgif-frame-{frame_str}.webp')
    
    if not os.path.exists(input_path):
        return f"File not found: {input_path}"
        
    if os.path.exists(output_path):
        return f"Skipped {frame_str}"
        
    try:
        # Create a new session per process since onnxruntime sessions aren't easily pickled/shared across processes
        session = new_session('u2netp')
        img = Image.open(input_path)
        out_img = remove(img, session=session)
        out_img.save(output_path, 'WEBP', quality=85, method=6)
        
        # Delete original JPG to fulfill user request "remove the bg image of all the frames"
        try:
            os.remove(input_path)
        except:
            pass
            
        return f"Processed {frame_str}"
    except Exception as e:
        return f"Error {frame_str}: {e}"

def main():
    input_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'public', 'resources'))
    print(f"Starting multi-core background removal for frames in {input_dir}")
    start_time = time.time()
    
    # Process using multiple cores (restrict to 4 to prevent OOM errors with ONNX)
    with ProcessPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(process_single_frame, range(1, 241)))
        
    for res in results:
        if "Error" in res:
            print(res)
            
    total_time = time.time() - start_time
    print(f"\nCompleted in {total_time:.2f} seconds.")
    
    # Delete this script itself as requested
    try:
        os.remove(__file__)
    except:
        pass

if __name__ == "__main__":
    # Freeze support for windows multiprocessing
    from multiprocessing import freeze_support
    freeze_support()
    main()
